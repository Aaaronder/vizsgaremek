using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using TagLib;          

namespace MusicPlayerWinForms
{
    public partial class MainForm : Form
    {
        private readonly List<Song> _songs = new(); // 歌曲列表        // Dal‑lista
        private int _currentIndex = -1;            // 当前播放索引    // Aktuális index
        private readonly AudioPlayer _player = new(); // 播放器实例   // Lejátszó példány

        public MainForm()
        {
            InitializeComponent();

            /* —— 事件连线 ——          // Esemény‑összekötés */
            songsListView.DoubleClick += songsListView_DoubleClick;
            btnUpload.Click += btnUpload_Click;
            btnDelete.Click += btnDelete_Click;
            btnPlayPause.Click += btnPlayPause_Click;
            btnPrev.Click += btnPrev_Click;
            btnNext.Click += btnNext_Click;  
            progressBar.Scroll += progressBar_Scroll;
            playbackTimer.Tick += PlaybackTimer_Tick;

            /* 初始化  // inicializálás */
            volumeBar.ValueChanged += (_, _) => _player.Volume = volumeBar.Value / 100f;
            volumeBar.Value = 80;                      // 默认 80%   // Alap 80 %
            _player.OnPlaybackStopped += PlayNext;     // 播完自动下一首 // Következő dal automatikus indítása
            AllowDrop = true;  // 允许拖放        // Húzd‑és‑ejtsd engedélyezése
            KeyPreview = true;  // 捕获快捷键      // Gyorsbillentyűk elfogása
            DragEnter += MainForm_DragEnter;
            DragDrop += MainForm_DragDrop;
        }

        /* 上传 / 解析标签 / 加入列表 // Feltöltés / tag‑kiolvasás / listához adás */
        private void btnUpload_Click(object? sender, EventArgs e)
        {
            using var dlg = new OpenFileDialog
            {
                Multiselect = true,                   // 允许多选 // Több fájl választható
                Filter = "Audio Files|*.mp3;*.wav;*.flac"
            };
            if (dlg.ShowDialog() != DialogResult.OK) return;
            foreach (var path in dlg.FileNames) AddSong(path);
        }

        private void AddSong(string path)
        {
            try
            {
                var tagFile = TagLib.File.Create(path); 
                var song = new Song
                {
                    FilePath = path,
                    Title = string.IsNullOrWhiteSpace(tagFile.Tag.Title)
                               ? Path.GetFileNameWithoutExtension(path)
                               : tagFile.Tag.Title,
                    Artist = tagFile.Tag.FirstPerformer ?? "Unknown",
                    Duration = tagFile.Properties.Duration
                };
                _songs.Add(song);
                songsListView.Items.Add(new ListViewItem(new[]
                {
                    _songs.Count.ToString(),
                    song.Title,
                    song.Artist,
                    song.Duration.ToString(@"mm\:ss")
                }));
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to load {path}\n{ex.Message}", "Tag Error");
            }
        }

        /* 双击播放 // Dupla katt a lejátszáshoz */
        private void songsListView_DoubleClick(object? sender, EventArgs e)
        {
            if (songsListView.SelectedIndices.Count == 0) return;
            _currentIndex = songsListView.SelectedIndices[0];
            PlayCurrent();
        }

        private void PlayCurrent()
        {
            if (_currentIndex < 0 || _currentIndex >= _songs.Count) return;

            playbackTimer.Stop();     // 暂停定时器  // Időzítő megállítása
            progressBar.Value = 0;    // 归零进度条  // Csúszka nullázása

            var song = _songs[_currentIndex];
            _player.Play(song.FilePath);
            progressBar.Maximum = (int)song.Duration.TotalSeconds;

            HighlightRow(_currentIndex);
            playbackTimer.Start();    // 重新计时    // Újraindítjuk az időzítőt
            btnPlayPause.Text = "⏸";
        }

        /* 播放 / 暂停按钮 // Lejátszás / szünet gomb */
        private void btnPlayPause_Click(object? sender, EventArgs e)
        {
            if (_songs.Count == 0) return;
            if (_currentIndex == -1) { _currentIndex = 0; PlayCurrent(); return; }

            _player.PauseOrResume();
            btnPlayPause.Text = _player.IsPlaying ? "⏸" : "⏵";
        }

        /* 上一首按钮   // Előző dal gomb */
        private void btnPrev_Click(object? s, EventArgs e)
        {
            if (_songs.Count == 0) return;
            _currentIndex = (_currentIndex - 1 + _songs.Count) % _songs.Count;
            PlayCurrent();
        }

        /* 下一首按钮   // Következő dal gomb */
        private void btnNext_Click(object? s, EventArgs e) => PlayNext();


        /* 顺序播放下一首   // Következő dal sorban */
        private void PlayNext()
        {
            if (_songs.Count == 0) return;
            _currentIndex = (_currentIndex + 1) % _songs.Count;
            PlayCurrent();
        }

        /* 进度条定时刷新 // Csúszka frissítése */
        private void PlaybackTimer_Tick(object? sender, EventArgs e)
        {
            if (!_player.IsPlaying) return;
            int pos = (int)_player.Current.TotalSeconds;
            if (pos <= progressBar.Maximum) progressBar.Value = pos;
        }

        private void progressBar_Scroll(object? s, EventArgs e) =>
            _player.Seek(progressBar.Value); // 拖动跳转 // Ugrás húzással

        /* 删除行 // Sor törlése */
        private void btnDelete_Click(object? s, EventArgs e)
        {
            if (songsListView.SelectedIndices.Count == 0) return;
            int idx = songsListView.SelectedIndices[0];

            bool wasPlaying = idx == _currentIndex;

            _songs.RemoveAt(idx);
            songsListView.Items.RemoveAt(idx);

            // 重新编号       // Újraszámozás
            for (int i = 0; i < songsListView.Items.Count; i++)
                songsListView.Items[i].SubItems[0].Text = (i + 1).ToString();

            if (_currentIndex > idx) _currentIndex--;
            else if (_currentIndex == idx) _currentIndex = -1;

            if (wasPlaying)
            {
                _player.Stop(); // 停止播放器   // Lejátszó leállítása
                if (_songs.Count > 0) { _currentIndex = 0; PlayCurrent(); }
                else { btnPlayPause.Text = "⏵"; progressBar.Value = 0; }
            }
        }

        /* 拖放导入 // Drag‑and‑drop import */
        private void MainForm_DragEnter(object? s, DragEventArgs e)
        {
            if (e.Data?.GetDataPresent(DataFormats.FileDrop) == true)
                e.Effect = DragDropEffects.Copy; // 显示复制光标 // Másolás kurzor
        }

        private void MainForm_DragDrop(object? s, DragEventArgs e)
        {
            if (e.Data?.GetData(DataFormats.FileDrop) is not string[] files) return;
            foreach (var f in files) AddSong(f);
        }

        /*快捷键//gyorsbillentyűk */
        protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
        {
            switch (keyData)
            {
                case Keys.Space: btnPlayPause.PerformClick(); return true; // 空格播放/暂停 // Szóköz: lejátszás/szünet
                case Keys.Delete: btnDelete.PerformClick(); return true; // Delete 删除   // Delete: törlés
                case Keys.Left: btnPrev.PerformClick(); return true; // ← 上一首     // Bal: előző
                case Keys.Right: btnNext.PerformClick(); return true; // → 下一首     // Jobb: következő
            }
            return base.ProcessCmdKey(ref msg, keyData);
        }

        /*  正在播放行加粗  // Folyamatban lévő sor félkövér */
        private void HighlightRow(int idx)
        {
            if (idx < 0 || idx >= songsListView.Items.Count) return;

            foreach (ListViewItem item in songsListView.Items)
                item.Font = new Font(item.Font, FontStyle.Regular);

            var current = songsListView.Items[idx];
            current.Font = new Font(current.Font, FontStyle.Bold);
            current.EnsureVisible(); 
        }
    }
}

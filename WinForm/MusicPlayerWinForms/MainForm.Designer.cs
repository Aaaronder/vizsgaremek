namespace MusicPlayerWinForms
{
    partial class MainForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
            songsListView = new ListView();
            columnHeader1 = new ColumnHeader();
            columnHeader2 = new ColumnHeader();
            columnHeader3 = new ColumnHeader();
            columnHeader4 = new ColumnHeader();
            btnUpload = new Button();
            btnDelete = new Button();
            btnPlayPause = new Button();
            btnNext = new Button();
            btnPrev = new Button();
            volumeBar = new TrackBar();
            playbackTimer = new System.Windows.Forms.Timer(components);
            progressBar = new TrackBar();
            ((System.ComponentModel.ISupportInitialize)volumeBar).BeginInit();
            ((System.ComponentModel.ISupportInitialize)progressBar).BeginInit();
            SuspendLayout();
            // 
            // songsListView
            // 
            songsListView.Columns.AddRange(new ColumnHeader[] { columnHeader1, columnHeader2, columnHeader3, columnHeader4 });
            songsListView.Dock = DockStyle.Top;
            songsListView.FullRowSelect = true;
            songsListView.GridLines = true;
            songsListView.Location = new Point(0, 0);
            songsListView.Name = "songsListView";
            songsListView.Size = new Size(832, 380);
            songsListView.TabIndex = 0;
            songsListView.UseCompatibleStateImageBehavior = false;
            songsListView.View = View.Details;
            songsListView.DoubleClick += songsListView_DoubleClick;
            // 
            // columnHeader1
            // 
            columnHeader1.Text = "#";
            columnHeader1.Width = 50;
            // 
            // columnHeader2
            // 
            columnHeader2.Text = "Title";
            columnHeader2.Width = 260;
            // 
            // columnHeader3
            // 
            columnHeader3.Text = "Artist";
            columnHeader3.Width = 160;
            // 
            // columnHeader4
            // 
            columnHeader4.Text = "Length";
            columnHeader4.Width = 80;
            // 
            // btnUpload
            // 
            btnUpload.Location = new Point(633, 414);
            btnUpload.Name = "btnUpload";
            btnUpload.Size = new Size(107, 38);
            btnUpload.TabIndex = 1;
            btnUpload.Text = "📂 Upload";
            btnUpload.UseVisualStyleBackColor = true;
            // 
            // btnDelete
            // 
            btnDelete.Location = new Point(633, 458);
            btnDelete.Name = "btnDelete";
            btnDelete.Size = new Size(107, 39);
            btnDelete.TabIndex = 2;
            btnDelete.Text = "🗑 Delete";
            btnDelete.UseVisualStyleBackColor = true;
            // 
            // btnPlayPause
            // 
            btnPlayPause.Location = new Point(335, 437);
            btnPlayPause.Name = "btnPlayPause";
            btnPlayPause.Size = new Size(122, 55);
            btnPlayPause.TabIndex = 3;
            btnPlayPause.Text = "⏯";
            btnPlayPause.UseVisualStyleBackColor = true;
            // 
            // btnNext
            // 
            btnNext.Location = new Point(463, 437);
            btnNext.Name = "btnNext";
            btnNext.Size = new Size(111, 55);
            btnNext.TabIndex = 4;
            btnNext.Text = "\t⏭";
            btnNext.UseVisualStyleBackColor = true;
            // 
            // btnPrev
            // 
            btnPrev.Location = new Point(209, 437);
            btnPrev.Name = "btnPrev";
            btnPrev.Size = new Size(120, 55);
            btnPrev.TabIndex = 6;
            btnPrev.Text = "⏮";
            btnPrev.UseVisualStyleBackColor = true;
            // 
            // volumeBar
            // 
            volumeBar.Dock = DockStyle.Right;
            volumeBar.Location = new Point(776, 380);
            volumeBar.Maximum = 100;
            volumeBar.Name = "volumeBar";
            volumeBar.Orientation = Orientation.Vertical;
            volumeBar.Size = new Size(56, 173);
            volumeBar.TabIndex = 7;
            volumeBar.Value = 80;
            // 
            // playbackTimer
            // 
            playbackTimer.Interval = 500;
            // 
            // progressBar
            // 
            progressBar.Dock = DockStyle.Bottom;
            progressBar.Location = new Point(0, 497);
            progressBar.Maximum = 100;
            progressBar.Name = "progressBar";
            progressBar.Size = new Size(776, 56);
            progressBar.TabIndex = 8;
            progressBar.TickStyle = TickStyle.None;
            progressBar.Scroll += progressBar_Scroll;
            // 
            // MainForm
            // 
            AllowDrop = true;
            AutoScaleDimensions = new SizeF(9F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(832, 553);
            Controls.Add(progressBar);
            Controls.Add(volumeBar);
            Controls.Add(btnPrev);
            Controls.Add(btnNext);
            Controls.Add(btnPlayPause);
            Controls.Add(btnDelete);
            Controls.Add(btnUpload);
            Controls.Add(songsListView);
            Name = "MainForm";
            Text = "Music Player";
            ((System.ComponentModel.ISupportInitialize)volumeBar).EndInit();
            ((System.ComponentModel.ISupportInitialize)progressBar).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private ListView songsListView;
        private ColumnHeader columnHeader1;
        private ColumnHeader columnHeader2;
        private ColumnHeader columnHeader3;
        private ColumnHeader columnHeader4;
        private Button btnUpload;
        private Button btnDelete;
        private Button btnPlayPause;
        private Button btnNext;
        private Button btnPrev;
        private TrackBar volumeBar;
        private System.Windows.Forms.Timer playbackTimer;
        private TrackBar progressBar;
    }
}

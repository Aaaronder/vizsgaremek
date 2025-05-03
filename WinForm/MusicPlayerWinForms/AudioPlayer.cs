using NAudio.Wave;

public class AudioPlayer : IDisposable
{
    private WaveOutEvent? _output;
    private AudioFileReader? _reader;

    public bool IsPlaying => _output?.PlaybackState == PlaybackState.Playing;
    public float Volume
    {
        get => _reader?.Volume ?? 0f;
        set { if (_reader != null) _reader.Volume = value; }
    }
    public TimeSpan Current => _reader?.CurrentTime ?? TimeSpan.Zero;
    public TimeSpan Length => _reader?.TotalTime ?? TimeSpan.Zero;

    //播放指定文件
    public void Play(string path)
    {
        SafeStop(raiseEvent: false);        
        _reader = new AudioFileReader(path);
        _output = new WaveOutEvent();
        _output.Init(_reader);
        _output.PlaybackStopped += OnWaveOutStopped;
        _output.Play();
    }

    public void PauseOrResume()
    {
        if (_output == null) return;
        if (_output.PlaybackState == PlaybackState.Playing) _output.Pause();
        else _output.Play();
    }

    public void Seek(double seconds)
    {
        if (_reader == null) return;
        seconds = Math.Clamp(seconds, 0, _reader.TotalTime.TotalSeconds);
        _reader.CurrentTime = TimeSpan.FromSeconds(seconds);
    }

    //删除当前歌曲
    public void Stop() => SafeStop(raiseEvent: false);

    private void SafeStop(bool raiseEvent)
    {
        if (_output == null) return;

        _output.PlaybackStopped -= OnWaveOutStopped;
        _output.Stop();

        if (raiseEvent) OnPlaybackStopped?.Invoke();   
        _output.Dispose();
        _reader?.Dispose();
        _output = null;
        _reader = null;
    }

    private void OnWaveOutStopped(object? sender, StoppedEventArgs e) =>
        OnPlaybackStopped?.Invoke();

    public event Action? OnPlaybackStopped;
    public void Dispose() => SafeStop(false);
}

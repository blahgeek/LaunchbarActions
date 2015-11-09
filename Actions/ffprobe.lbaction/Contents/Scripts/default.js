// LaunchBar Action Script

function run(argument) {
    LaunchBar.alert('No argument was passed to the action');
}

function runWithPaths(paths) {
    var data_json = LaunchBar.execute("/usr/local/bin/ffprobe", "-v", "quiet",
                                      "-print_format", "json",
                                      "-show_format", "-show_streams", paths[0]);
    var data = JSON.parse(data_json);
    var ret = [];
    if (!data.format || !data.streams)
        return ret;

    ret.push({
        title: data.format.filename,
        path: paths[0],
        label: "Path"
    });

    ret.push({
        title: data.format.format_long_name + " / " +
                parseFloat(data.format.duration).toFixed(2) + "s / " +
                (parseFloat(data.format.bit_rate) / 1024.0).toFixed(2) + " kbps",
        label: "Info"
    });

    var map_to_item = function(m) {
        var r = [];
        for(var key in m)
            if(m.hasOwnProperty(key))
                r.push({title: "" + m[key], label: "" + key});
        return r;
    };

    data.streams.forEach(function(stream) {
        if(stream.codec_type == "video")
            ret.push({
                title: stream.codec_name.toUpperCase() + " / " + 
                        stream.width + "x" + stream.height + "@" + 
                        parseFloat(eval(stream.r_frame_rate)).toFixed(2) + 
                        " / " + stream.pix_fmt,
                children: map_to_item(stream),
                label: "Video",
            });
        if(stream.codec_type == "audio")
            ret.push({
                title: stream.codec_name.toUpperCase() + " / " +
                        stream.channel_layout + " / " + 
                        stream.sample_rate + " Hz / " +
                        (parseFloat(stream.bit_rate) / 1024.0).toFixed(2) + " kbps",
                children: map_to_item(stream),
                badge: "Audio",
            });
    });
    return ret;
}

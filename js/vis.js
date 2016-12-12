var tobesent =[];
var nicedata = [];
var renderers = {
    'bar':(function(){
        var yScale,count,width,barWidth,height,initialized,chance ;
        var init = function(config){
            chance = 0;
            count = config.count;
            yScale = d3.scale.linear()
                .domain([0,255])
                .range([$("#main1").height(),0]);
            colorScale = d3.scale.linear()
                .domain([0,count])
                .range([0,255]);

            width = config.width;
            barWidth = (width / count) >> 0;
            height = config.height;
            initialized = true;
        };
        var renderFrame = function(frequencyData){
            var svg;
            if(chance==0){
                 svg = d3.select("#main1");
                svg.selectAll('g').remove();
                var g=svg.append('g');
                //console.log("frequencyData:"+frequencyData);

                g.selectAll(".bar")
                    .data(frequencyData)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d,i) {
                        return barWidth*i })
                    .attr("y", function(d) {
                        return yScale((100*d+(255/2))>>0);
                    })
                    .attr("width", barWidth-1)
                    .attr("height", function(d) { return height - yScale((100*d+(255/2))>>0); })
                    .attr("rx",10)
                    .attr("ry",10)
                    .style("fill",function(d,i){
                        return "rgb("+(255-colorScale(i)>>0)+","+(colorScale(i)>>0)+",255)";
                        //return "rgb("+(colorScale(d)>>0)+","+(255-(colorScale(d)>>0))+",255)";
                    });
                console.log("type1"+frequencyData);
                chance++;
            }else
            if(chance==1){
                svg = d3.select("#main2");
                svg.selectAll('g').remove();
                var g=svg.append('g');
                //console.log("frequencyData:"+frequencyData);

                g.selectAll(".bar")
                    .data(frequencyData)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d,i) {
                        return barWidth*i })
                    .attr("y", function(d) { return yScale((d+255/2)>>0); })
                    .attr("width", barWidth-1)
                    .attr("height", function(d) { return height - yScale((d+255)>>0); })
                    .attr("rx",10)
                    .attr("ry",10)
                    .style("fill",function(d,i){
                        return "rgb("+(255-colorScale(i)>>0)+","+(colorScale(i)>>0)+",255)";
                        //return "rgb("+(colorScale(d)>>0)+","+(255-(colorScale(d)>>0))+",255)";
                    });
                console.log("type2"+frequencyData);
                chance++;
            }else
            if(chance==2){
                svg = d3.select("#main3");
                svg.selectAll('g').remove();
                var g=svg.append('g');
                //console.log("frequencyData:"+frequencyData);

                g.selectAll(".bar")
                    .data(frequencyData)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d,i) {
                        return barWidth*i })
                    .attr("y", function(d) { return yScale(d>>0); })
                    .attr("width", barWidth-1)
                    .attr("height", function(d) { return height - yScale(d>>0); })
                    .attr("rx",10)
                    .attr("ry",10)
                    .style("fill",function(d,i){
                        return "rgb("+(255-colorScale(i)>>0)+","+(colorScale(i)>>0)+",255)";
                        //return "rgb("+(colorScale(d)>>0)+","+(255-(colorScale(d)>>0))+",255)";
                    });
                console.log("type3"+frequencyData);
                chance++;
            }else
            if(chance==3){
                svg = d3.select("#main4");
                svg.selectAll('g').remove();
                var g=svg.append('g');
                //console.log("frequencyData:"+frequencyData);

                g.selectAll(".bar")
                    .data(frequencyData)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d,i) {
                        return barWidth*i })
                    .attr("y", function(d) { return yScale((d/2)>>0); })
                    .attr("width", barWidth-1)
                    .attr("height", function(d) { return height - yScale((d/2)>>0); })
                    .attr("rx",10)
                    .attr("ry",10)
                    .style("fill",function(d,i){
                        return "rgb("+(255-colorScale(i)>>0)+","+(colorScale(i)>>0)+",255)";
                        //return "rgb("+(colorScale(d)>>0)+","+(255-(colorScale(d)>>0))+",255)";
                    });
                console.log("type4"+frequencyData);
                chance=0;
            }


        };
        return {
            init: init,
            isInitialized: function() {
                return initialized;
            },
            renderFrame: renderFrame
        }
    })(),
    'baranim':(function(){
        var yScale,count,width,barWidth,height,initialized, z,a ;
        var frames = 20;
        var data= new Array(frames);
        var init = function(config){
            count = 64;
            yScale = d3.scale.linear()
                .domain([0,255])
                .range([255,0]);
            colorScale = d3.scale.linear()
                .domain([0,count])
                .range([0,255]);

            width = config.width;
            barWidth = 10;
            height = 255;
            initialized = true;
            z=0;
            a = 0;
            for(var i=0;i<frames;i++) {
                data[i] = new Array(32);
                for (var j = 0; j < 32; j++)
                    data[i][j] = 0;
            }
        };
        var renderFramenew = function(frequencyData){
            var svg = d3.select("#main");
            svg.selectAll('g').remove();
            var g = svg.append('g')
                .attr("transform","translate(100,100)");
            g.append('rect')
                .attr("x", function (d, i) {
                    return 0;
                })
                .attr("y", function (d) {
                    return 0;
                })
                .attr("width", 100)
                .attr("height", 100)
                .attr("transform","rotate(10"+(++z%360)+")");

        };
        var renderFrame = function(frequencyData){
            var svg = d3.select("#main");
            svg.selectAll('g').remove();
            for(var b = 0;b<32;b++){
                data[z][b]=frequencyData[b];
            }

            a=(z+1)%frames;
            for(var x = 0;x<frames && a!=z;x++) {
                var g = svg.append('g')
                    .attr("transform", "translate("+(450-x*20)+","+(150+x*10)+")skewY(15)");

                g.selectAll(".bar")
                    .data(data[a])
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d, i) {
                        return barWidth * i
                    })
                    .attr("y", function (d) {
                        return yScale(d);
                    })
                    .attr("width", barWidth - 1)
                    .attr("height", function (d) {
                        return height - yScale(d);
                    })
                    .attr("rx", 10)
                    .attr("ry", 10)
                    .style("fill", function (d, i) {
                        //return "rgb(" + (255 - colorScale(d) >> 0) + "," + (colorScale(i) >> 0) + ",255)";
                        return "rgb(" + (255 - d) + "," + d + ",255)";
                    });
                a = (a+1)%frames;
            }
            z = (z+1)%frames;
        };
        var renderFramenotworking = function(frequencyData){
            var svg = d3.select("#main");
            svg.selectAll('g').remove();
            for(var b = 0;b<32;b++){
                data[z][b]=frequencyData[b];
            }
            b=0;
            a=z+1;
            while(a!=z){
                var g = svg.append('g')
                    .attr("transform","translate(50"+(b*2)+",100)");

                g.selectAll(".bar")
                    .data(data[a])
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d, i) {
                        return barWidth * i
                    })
                    .attr("y", function (d) {
                        return yScale(d)/3;
                    })
                    .attr("width", barWidth - 1)
                    .attr("height", function (d) {
                        return height - yScale(d)/3;
                    })
                    .attr("rx", 10)
                    .attr("ry", 10)
                    .style("fill", function (d, i) {
                        return "rgb(" + (255 - colorScale(i) >> 0) + "," + (colorScale(i) >> 0) + ",255)";
                        //return "rgb("+(colorScale(d)>>0)+","+(255-(colorScale(d)>>0))+",255)";
                    });
                a = (a++)%10;
                b++;
            }
            z = (z++)%10;
        };
        return {
            init: init,
            isInitialized: function() {
                return initialized;
            },
            renderFrame: renderFrame
        }
    })(),
    'dots':(function(){
        var yScale,count,width,barWidth,height,initialized, data =[];
        var init = function(config){
            yScale = d3.scale.linear()
                .domain([0,300])
                .range([$("#main").height(),0]);
            colorScale = d3.scale.linear()
                .domain([0,500])
                .range([0,255]);
            count = config.count;
            width = config.width;
            barWidth = (width / count) >> 0;
            height = config.height;
            initialized = true;
        };
        var renderFrame = function(frequencyData){
            if(frequencyData[0] >-500 ) {
                data = [];
                for (var g = 0; g < frequencyData.length; g++) {
                    s = frequencyData[g].toFixed(2);
                    data.push(s);
                }
                tobesent.push(data);
            }
        };
        return {
            init: init,
            isInitialized: function() {
                return initialized;
            },
            renderFrame: renderFrame
        }
    })(),
    'line':(function(){
        var yScale,count,width,barWidth,height,initialized,line;
        var init = function(config){
            yScale = d3.scale.linear()
                .domain([0,300])
                .range([$("#main").height(),0]);
            colorScale = d3.scale.linear()
                .domain([0,500])
                .range([0,255]);
            count = config.count;
            width = config.width;
            barWidth = (width / count) >> 0;
            height = config.height;
            initialized = true;
            line = d3.svg.line()
                .x(function(d,i) { return (i*barWidth); })
                .y(function(d) { return yScale(d); });
        };
        var renderFrame = function(frequencyData){
            var svg = d3.select("#main");
            svg.selectAll('g').remove();
            var g=svg.append('g');
            var path = g.append("path")
                .datum(frequencyData)
                .attr("class", "line")
                .attr("d", line);
            path.style("fill","none")
                .style("stroke", "steelblue")
                .style("stroke-width", 2);


        };
        return {
            init: init,
            isInitialized: function() {
                return initialized;
            },
            renderFrame: renderFrame
        }
    })(),
    'linedots':(function(){
        var yScale,count,width,barWidth,height,initialized,line;
        var init = function(config){
            yScale = d3.scale.linear()
                .domain([0,300])
                .range([$("#main").height(),0]);
            colorScale = d3.scale.linear()
                .domain([0,500])
                .range([0,255]);
            count = config.count;
            width = config.width;
            barWidth = (width / count) >> 0;
            height = config.height;
            initialized = true;
            line = d3.svg.line()
                .x(function(d,i) { return (i*barWidth); })
                .y(function(d) { return yScale(d); });
        };
        var renderFrame = function(frequencyData){
            var svg = d3.select("#main");
            svg.selectAll('g').remove();
            var g=svg.append('g');
            g.selectAll(".dot")
                .data(frequencyData)
                .enter().append("circle")
                .attr("class", "bar")
                .attr("cx", function(d,i) {
                    return barWidth*i })
                .attr("cy", function(d) { return yScale(d); })
                .attr("r", 10)
                //.attr("height", function(d) { return height - yScale(d); })
                //.attr("rx",10)
                //.attr("ry",10)
                .style("fill",function(d,i){
                    return "rgb("+(255-(i*9))+","+(i*9)+",255)";
                    //return "rgb("+(colorScale(d)>>0)+","+(255-(colorScale(d)>>0))+",255)";
                });
            var g=svg.append('g');
            var path = g.append("path")
                .datum(frequencyData)
                .attr("class", "line")
                .attr("d", line);
            path.style("fill","none")
                .style("stroke", "steelblue")
                .style("stroke-width", 2);


        };
        return {
            init: init,
            isInitialized: function() {
                return initialized;
            },
            renderFrame: renderFrame
        }
    })(),
    'circles':(function(){
        var yScale,count,width,barWidth,height,initialized,line;
        var init = function(config){
            rScale = d3.scale.linear()
                .domain([0,300])
                .range([0,15]);
            colorScale = d3.scale.linear()
                .domain([0,500])
                .range([0,255]);
            count = config.count;
            width = config.width;
            barWidth = (width / count) >> 0;
            height = config.height;
            initialized = true;
        };
        var renderFrame = function(frequencyData){
            var svg = d3.select("#main");
            svg.selectAll('g').remove();
            var g=svg.append('g');
            g.selectAll(".circles")
                .data(frequencyData)
                .enter().append("circle")
                .attr("cx", window.innerWidth/2)
                .attr("cy", window.innerHeight/2)
                .attr("r", function(d,i){
                    return i*15;
                })
                .style("fill",function(d,i){
                    return "none";
                    //return "rgb("+(i*9)+","+(255-(i*9))+",255)";
                    //return "rgb("+(colorScale(d)>>0)+","+(255-(colorScale(d)>>0))+",255)";
                })
                .style("stroke",function(d,i){return "rgb("+(255-(i*9))+","+(i*9)+",255)";})
                .style("stroke-width",function(d){return rScale(d);})
        };
        return {
            init: init,
            isInitialized: function() {
                return initialized;
            },
            renderFrame: renderFrame
        }
    })(),
    'circles1':(function(){
        var yScale,count,width,barWidth,height,initialized,line;
        var init = function(config){
            rScale = d3.scale.linear()
                .domain([0,300])
                .range([0,50]);
            colorScale = d3.scale.linear()
                .domain([0,500])
                .range([0,255]);
            count = config.count;
            width = config.width;
            barWidth = (width / count) >> 0;
            height = config.height;
            initialized = true;
        };
        var renderFrame = function(frequencyData){
            var svg = d3.select("#main");
            svg.selectAll('g').remove();
            var g=svg.append('g');
            g.selectAll(".circles")
                .data(frequencyData)
                .enter().append("circle")
                .attr("cx", window.innerWidth/2)
                .attr("cy", window.innerHeight/2)
                .attr("r", function(d,i){return ((i*10) + rScale(d));})
                .style("fill",function(d,i){
                    return "none";
                    //return "rgb("+(i*9)+","+(255-(i*9))+",255)";
                    //return "rgb("+(colorScale(d)>>0)+","+(255-(colorScale(d)>>0))+",255)";
                })
                .style("stroke",function(d,i){return "rgb("+(255-(i*9))+","+(i*9)+",255)";})
                .style("stroke-width",function(d){
                    if(d==0)
                        return "0";
                    else
                        return "2";

                })
        };
        return {
            init: init,
            isInitialized: function() {
                return initialized;
            },
            renderFrame: renderFrame
        }
    })(),
    'new':(function(){
        var yScale,count,width,barWidth,height,initialized,line;
        var init = function(config){
            rScale = d3.scale.linear()
                .domain([0,300])
                .range([0,50]);
            colorScale = d3.scale.linear()
                .domain([0,500])
                .range([0,255]);
            count = config.count;
            width = config.width;
            barWidth = (width / count) >> 0;
            height = config.height;
            initialized = true;
        };
        var renderFrame = function(frequencyData){


        };
        return{
            init: init,
            isInitialized: function(){
                return initialized;
            },
            renderFrame: renderFrame
        }
    })(),
};
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
var visualmusic = function(renderer){

    var audio, audioStream, analyser, source, audioCtx,canvasCtx, frequencyData1, frequencyData2, running = false,
        renderer = renderer,
        width = +$("#main1").width(),
        height = +$("#main1").height();

    var init = function () {
        audio = $('#r0audio').get(0);

        audioCtx = new AudioContext();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 64;
        frequencyData1 = new Uint8Array(analyser.frequencyBinCount);
        frequencyData2 = new Float32Array(analyser.frequencyBinCount);
        //console.log("analyser.frequencyBinCount:"+analyser.frequencyBinCount);
        //console.log("frequencyData:"+frequencyData);
        renderer.init({
            count: analyser.frequencyBinCount,
            width: width,
            height: height
        });
    };
    this.start = function () {
        audio.play();
        running = true;
        renderFrame();
    };
    this.stop = function () {
        running = false;
        audio.pause();
        console.log("stopped");

        //$.post("collect.php?data="+tobesent,null,function(data,status){alert(data + status);});
        //req = new XMLHttpRequest();
        //req.open("POST","collect.php",true);
        //req.setRequestHeader("Content-type","application/json");
        //req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //req.send("json_string="+JSON.stringify(tobesent));

        $.ajax({
                url: "collect.php?data=d",
                type: "GET",
                contentType: "application/x-www-form-urlencoded"
            })
            .done(function(data){
                nicedata = data;
                nicedata = +nicedata;
                console.log(nicedata);
            });

        /*$.ajax({
            url: "collect.php",
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: {"json_string": JSON.stringify(tobesent)}
        })
            .done(function(data){
                $.ajax({
                        url: "collect.php?data=d",
                        type: "GET",
                        contentType: "application/x-www-form-urlencoded"
                    })
                    .done(function(data){
                        nicedata = data;
                        console.log(nicedata);
                    });

            });*/

    };
    this.setRenderer = function(r) {
        if (!r.isInitialized()) {
            r.init({
                count: analyser.frequencyBinCount,
                width: width,
                height: height
            });
        }
        renderer = r;
    };
    this.isPlaying = function () {
        return running;
    };
    var renderFrame = function () {
        //analyser.getFloatTimeDomainData(frequencyData2);
        //renderer.renderFrame(frequencyData2);
        analyser.getFloatFrequencyData(frequencyData2);
        renderer.renderFrame(frequencyData2);
        //analyser.getByteTimeDomainData(frequencyData1);
        //renderer.renderFrame(frequencyData1);
        //analyser.getByteFrequencyData(frequencyData1);
        //renderer.renderFrame(frequencyData1);
        if (running) {
            requestAnimationFrame(renderFrame);
        }
        else{
            console.log("not running");
        }
    };
    init();

};
var v;
var currentRenderer = renderers['dots'];
$(window).ready(function(){
    $("#main1").width(window.innerWidth/2-10);
    $("#main1").height(window.innerHeight/2-30) ;
    $("#main2").width(window.innerWidth/2-10);
    $("#main2").height(window.innerHeight/2-30) ;
    $("#main3").width(window.innerWidth/2-10);
    $("#main3").height(window.innerHeight/2-30) ;
    $("#main4").width(window.innerWidth/2-10);
    $("#main4").height(window.innerHeight/2-30) ;
    v = new visualmusic(currentRenderer);
    v.start();
});
/*$('#r0audio').click(function() {
 /*if (this.paused == false) {
 this.pause();
 v.stop();
 } else {
 this.play();
 v.start();
 }
 alert();
 });*/

$("#r0audio").on("pause",function(){
    v.stop();
});
var f = 1;
$("#playbutton").click(function(){
    if(f==1){
        v.stop();
        f=0;
    }
    else{
        v.start();
        f=1;
    }
});
$("#prevbutton").click(function(){
    if(currentRenderer == renderers['circles1']){
        currentRenderer= renderers['circles'];
        v.setRenderer(currentRenderer);
    }else
    if(currentRenderer == renderers['circles']){
        currentRenderer= renderers['linedots'];
        v.setRenderer(currentRenderer);
    }else
    if(currentRenderer == renderers['linedots']){
        currentRenderer= renderers['line'];
        v.setRenderer(currentRenderer);
    }else
    if(currentRenderer == renderers['line']){
        currentRenderer= renderers['dots'];
        v.setRenderer(currentRenderer);
    }
    else
    if(currentRenderer == renderers['dots']){
        currentRenderer= renderers['bar'];
        v.setRenderer(currentRenderer);
    }else
    if(currentRenderer == renderers['bar']){
        currentRenderer= renderers['circles'];
        v.setRenderer(currentRenderer);
    }
});
$("#nextbutton").click(function(){
    if(currentRenderer == renderers['bar']){
        currentRenderer= renderers['dots'];
        v.setRenderer(currentRenderer);
    }else
    if(currentRenderer == renderers['dots']){
        currentRenderer= renderers['line'];
        v.setRenderer(currentRenderer);
    }
    else
    if(currentRenderer == renderers['line']){
        currentRenderer= renderers['linedots'];
        v.setRenderer(currentRenderer);
    }
    else
    if(currentRenderer == renderers['linedots']) {
        currentRenderer = renderers['circles'];
        v.setRenderer(currentRenderer);
    }
    else
    if(currentRenderer == renderers['circles']) {
        currentRenderer = renderers['circles1'];
        v.setRenderer(currentRenderer);
    }

});




/*
 var accessId = '83c202cd-d755-442a-ae95-fd2368a044c7';
 var taskUrl = 'analyze/key';
 var parameters = { blocking: false, format: 'json', access_id: accessId };

 // the values for these parameters were taken from the corresponding controls in the demo form
 parameters['input_file'] = 'http://www.sonicAPI.com/music/solo_sax.mp3';
 parameters['detailed_result'] = 'false';

 function onTaskStarted(data) {
 var fileId = data.file.file_id;

 // request task progress every 500ms
 var polling = setInterval(pollTaskProgress, 500);

 function pollTaskProgress() {
 $.ajax({
 url: 'https://api.sonicAPI.com/file/status?file_id=' + fileId + '&access_id=' + accessId + '&format=json',
 crossDomain: true, success: function(data) {
 if (data.file.status == 'ready') {
 onTaskSucceeded(fileId);
 clearInterval(polling);
 } else if (data.file.status == 'working') {
 //console.log(data.file.progress + '% done');
 $('#result').text(data.file.progress + '% done');
 }
 }});
 }
 }

 function onTaskSucceeded(fileId) {
 var downloadUrl = 'https://api.sonicAPI.com/file/download?file_id=' + fileId + '&access_id=' + accessId + '&format=json';

 $.ajax({
 url: downloadUrl,
 crossDomain: true,
 success: function(data) {
 $('#result').html('Task succeeded, analysis result:<pre>' + JSON.stringify(data, null, 4) + '</pre>');
 //console.log('Task succeeded, analysis result:<pre>' + JSON.stringify(data, null, 4) + '</pre>');
 }
 });
 }

 function onTaskFailed(response) {
 var data = $.parseJSON(response.responseText);
 var errorMessages = data.errors.map(function(error) {
 return error.message;
 });

 $('#result').text('Task failed, reason: ' + errorMessages.join(','));
 }

 // start task when clicking on the "Start task" button
 $(document).ready(function() {
 $('#start').click(function() {
 // execute an HTTP GET using the task's URL, the parameters and callback functions defined above
 $.ajax({
 url: 'https://api.sonicAPI.com/' + taskUrl,
 data: parameters,
 success: onTaskStarted,
 error: onTaskFailed,
 crossDomain: true
 });
 });
 });
 */

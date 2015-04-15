"use strict";function scarletteCapture(a,b){function c(a,c,d,e){a.matrixSourcesPool=[],a.matrixRoutesPool=[],a.updatePool=function(a,b,c){a[b].used=c;for(var d=0;d<a[b].options.length;d++)a[b].options[d].disabled=c},a.takeLinePool=function(b,c,d){d!==c.value&&a.callback([c.numid],[d]),0==d||b[d].used||a.updatePool(b,d,!0)},a.freeLinePool=function(b,c,d){d!==c.value&&a.updatePool(b,d,!1),0!=d&&a.callback([c.numid],[0])},a.ProcessRouteSource=function(a){var b={name:a.name+" numid="+a.numid,actif:a.actif,numid:a.numid,value:a.value[0],line:a};return b},a.ProcessFader=function(a,b,c,d){var e={name:a.name+" numid="+a.numid,channel:{numid:a.numid,actif:a.actif,idxin:b,idxout:c,mixgrp:d},ctrl:{value:a.value,notLess:a.ctrl.min,notMore:a.ctrl.max,byStep:a.ctrl.step}};return e},a.initWidget=function(b){if(b){for(var c=[],d=[],e=[],f=b.sources[1].ctrl.enums,g=0;g<f.length;g++)a.matrixSourcesPool.push({id:g,name:f[g],used:!1,options:[]});for(var g=0;g<b.sources.length;g+=a.faderGroup){for(var h=[],i=[],j=[],k=0;k<a.faderGroup;k++)j.push(g+k+1),i.push(b.sources[g+k].numid),h.push(a.ProcessRouteSource(b.sources[g+k]));var l={uid:"Numid"+JSON.stringify(i),label:"Line "+JSON.stringify(j),name:"Capture Source "+JSON.stringify(j),matrixLinesPool:a.matrixSourcesPool,lines:h};c.push(l)}for(var m=b.routes[1].ctrl.enums,g=0;g<m.length;g++)a.matrixRoutesPool.push({id:g,name:m[g],used:!1,options:[]});for(var g=0;g<b.routes.length;g+=+a.faderGroup){for(var h=[],i=[],j=[],k=0;k<a.faderGroup;k++)j.push(g+k+1),i.push(b.routes[g+k].numid),h.push(a.ProcessRouteSource(b.routes[g+k]));var l={uid:"Numid"+JSON.stringify(i),label:"Route "+JSON.stringify(j),name:"Playback Route "+JSON.stringify(j),matrixLinesPool:a.matrixRoutesPool,lines:h};d.push(l)}for(var g=0;g<b.mixes.length;g+=a.mixerGroup){for(var n=[],o=[],k=0;k<a.mixerGroup;k++)n.push(b.mixes[g+k].name);for(var k=0;k<b.mixes[g].volumes.length;k+=a.faderGroup){for(var p=[],q=k;q<k+a.faderGroup;q++){for(var r=[],s=g;s<g+a.mixerGroup;s++)r.push(a.ProcessFader(b.mixes[s].volumes[q],q-k,s-g,g));p.push(r)}o.push(p)}var l={name:"Mix:"+n.toString(),mixvol:o};e.push(l)}a.matrixSources=c,a.matrixRoutes=d,a.matrixMixVols=e}},a.TabSelected=function(c){var d=c*a.mixerGroup;b.refreshPool(d)},a.MatrixPoolCB={take:function(b,c,d){a.takeLinePool(b,c,d)},free:function(b,c,d){a.freeLinePool(b,c,d)}},a.ActivateCtrlsCB=function(b,c){a.callback(b,[c])},a.mixerGroup=parseInt(d.mixerGroup)||2,a.faderGroup=parseInt(d.faderGroup)||2,a.$watch("initvalues",function(){a.initvalues&&a.initWidget(a.initvalues)})}return{templateUrl:"partials/scarlett-capture.html",scope:{callback:"=",initvalues:"="},restrict:"E",link:c}}function scarlettMaster(a){function b(b,c,d){b.matrixPlaybackPool=[],b.clockSourcesPool=[],b.usbSourcesPool=[],b.idxcounter=1,b.selectElem=c[0].firstChild,b.initWidget=function(c){var d;a.log("scarletteMaster initvalues=",c),b.switches=c.switches;for(var e=[],f=0;f<c.volumes.length;f++)e.push(b.ProcessVolume(c.volumes[f],f));b.volumes=e,d=c.sources[0].ctrl.enums;for(var f=0;f<d.length;f++)b.matrixPlaybackPool.push({id:f,name:d[f],used:!1,options:[]});for(var g=[],f=0;f<c.sources.length;f++)g.push(b.ProcessSource(c.sources[f],b.matrixPlaybackPool));b.playSources=g,a.log("master playback sources=",g),d=c.switches.clock.ctrl.enums;for(var f=0;f<d.length;f++)b.clockSourcesPool.push({id:f,name:d[f],used:!1,options:[]});b.clockSources=b.ProcessSource(c.switches.clock,b.clockSourcesPool),a.log("master clockswitch=",b.clockSources),d=c.switches.usb.ctrl.enums;for(var f=0;f<d.length;f++)b.usbSourcesPool.push({id:f,name:d[f],used:!1,options:[]});b.usbSources=b.ProcessSource(c.switches.usb,b.usbSourcesPool),a.log("master usbswitch=",b.usbSources),b.syncstatus=c.switches.syncon.value[0]},b.checkSyncStatus=function(){},b.updatePool=function(a,b,c){a[b].used=c;for(var d=0;d<a[b].options.length;d++)a[b].options[d].disabled=c},b.takeLinePool=function(a,c,d){d!==c.value&&b.callback([c.numid],[d]),0==d||a[d].used||b.updatePool(a,d,!0)},b.freeLinePool=function(a,c,d){d!==c.value&&b.updatePool(a,d,!1),0!=d&&b.callback([c.numid],[0])},b.ProcessSource=function(a,b){var c=a.name.split(" "),d={label:c[1]+"-"+c[2],uid:"SrcId:"+a.numid,matrixLinesPool:b,lines:[{actif:a.actif,numid:a.numid,name:a.name+" numid="+a.numid,value:a.value[0],line:a}]};return d},b.ProcessVolume=function(a,b){var c={channel:{idx:b,actif:a.actif,count:a.ctrl.count,numid:a.numid,name:a.name+" numid="+a.numid,uid:"VolId:"+a.numid},ctrl:{value:a.value,notLess:a.ctrl.min,notMore:a.ctrl.max,byStep:a.ctrl.step}};return c},b.ActivateCtrlsCB=function(c,d){a.log("scarlettMaster CB numids=%j value=%d",[c],d),b.callback([c],d)},b.switchid=d.id|"switch-"+parseInt(1e3*Math.random()),b.$watch("initvalues",function(){b.initvalues&&b.initWidget(b.initvalues)}),b.MatrixPoolCB={take:function(a,c,d){b.takeLinePool(a,c,d)},free:function(a,c,d){b.freeLinePool(a,c,d)}}}return{templateUrl:"partials/scarlett-master.html",scope:{callback:"=",initvalues:"=",syncstatus:"="},restrict:"E",link:b}}function ScarlettController(a,b,c,d,e,f,g){var h=this;h.SessionLabelPool=[],h.SessionLabelName={uid:"session",label:"current-session"},h.SessionLabelInfo={uid:"info",label:void 0},h.GetSessionsList=function(a){var b={request:"session-list",cardid:h.cardid},d=c.get("/jsonapi",{params:b});a>0&&g.reset(),a>1&&h.GetSndControls(),d.error(function(a,b,c){alert("Fail to upload session list [sndcard="+h.cardid+"from AlsaJsonGateway")}),d.success(function(a,b,c,d){return"AJG_sessions"!=a.ajgtype?void alert("AJM:FAIL ScarlettMixerController not a AJG_sessions record sndcard="+h.cardid+", response="+JSON.stringify(a)):void(h.SessionsList=a.data)})},h.SessionLoad=function(b,d){if(b){var i={request:"session-load",cardid:h.cardid,session:b},j=c.get("/jsonapi",{params:i});j.error(function(a,c,d){alert("Fail to upload "+b+" from AlsaJsonGateway")}),j.success(function(b,c,i,j){if(h.sndcard=b.sndcard,"AJG_message"===b.ajgtype)return d.addClass("ajg-error"),d.removeClass("ajg-success"),void("empty"==b.status?e.warning({message:b.info,delay:5e3}):e.error({message:b.info,delay:5e3}));if("AJG_session"!==b.ajgtype)return void alert("AJM:FAIL ScarlettMixerController sndcard="+h.cardid+", response="+JSON.stringify(b));if(a.log("SessionLoad data=",b),d.removeClass("ajg-error"),d.addClass("ajg-success"),b.data)for(var k=0;k<b.data.length;k++){var l=b.data[k];f.setValue(l.numid,l.value)}if(b.info){var m=b.info;if("AJG_infos"!=m.ajgtype||!m.data)return void alert("AJM:FAIL ScarlettMixerController sndcard="+h.cardid+", invalid info="+JSON.stringify(m));for(var k=0;k<m.data.length;k++){var l=m.data[k];g.setValue(l.uid,l.label)}}})}},h.GetSndControls=function(){var a={request:"ctrl-get-all",cardid:h.cardid},b=c.get("/jsonapi",{params:a});b.error(function(a,b,c){alert("Fail to get SndCard's controls from AlsaJsonGateway")}),b.success(function(a,b,c,d){h.sndcard=a.sndcard;var e,f,g,i=[],j=[],k=[],l=[],m=[],n=[],o=[],p=[];if("AJG_ctrls"!=a.ajgtype)return void alert("AJM:FATAL ScarlettMixerController sndcard="+h.cardid+", response="+JSON.stringify(a));for(var q=a.data,r=0;r<q.length;r++){var s=q[r],t=s.name.toLowerCase().split(" ");if("input"===t[0]&&"capture"===t[3]&&i.push(s),"matrix"===t[0]&&"playback"==t[3]&&k.push(s),"matrix"===t[0]&&"mix"===t[2]&&"volume"==t[5]){var u=t[3];j[u]||(j[u]={name:u.toUpperCase(),volumes:[]}),j[u].volumes.push(s)}"master"===t[0]&&"switch"===t[t.length-1]&&l.push(s),"master"===t[0]&&"volume"===t[t.length-1]&&o.push(s),"master"===t[0]&&"enum"===t[t.length-1]&&p.push(s),"input"===t[0]&&"pad"==t[2]&&n.push(s),"input"===t[0]&&"impedance"===t[2]&&m.push(s),"scarlett"===t[0]&&"usb-sync"===t[2]&&(e=s),"sample"===t[0]&&"sync"===t[2]&&(f=s),"sample"===t[0]&&"source"===t[2]&&(g=s)}var v=[];j&&Object.keys(j).forEach(function(a,b){v.push(j[a])},j),h.alsamixer={sources:i,routes:k,mixes:v},h.alsamaster={volumes:o,sources:p,switches:{master:l,pad:n,impedance:m,usb:e,syncon:f,clock:g}}})},h.SessionStore=function(){var b=g.getValue(h.SessionLabelName.uid),d=g.getValue(h.SessionLabelInfo.uid);if(void 0===d){var f=(new Date).toLocaleString(),i="AJG session created at "+f;h.LabelByUid.setValue(h.SessionLabelInfo.uid,i)}var j=g.getPool(),d={ajgtype:"AJG_infos",data:j};a.log("session=",d,"pool=",d);var k={request:"session-store",cardid:h.cardid,session:b},l=c({method:"POST",url:"/jsonapi",params:k,data:JSON.stringify(d)});l.success(function(a,b,c,d){e.success({message:"Session Store on AlsaJsonGateway",delay:3e3})}),l.error(function(a,b,c){alert("Fail to Store Session onto AlsaJsonGateway status="+a)})},h.checkSyncStatus=function(){var a={request:"ctrl-get-one",cardid:h.cardid,numid:208},b=c.get("/jsonapi",{params:a});b.success(function(a,b,c,d){h.BoardSyncStatus=!a.data||a.data[0]?!1:a.data[0].value[0]})},h.SendAlsaCtrlsCB=function(a,b){var e={request:"ctrl-set-many",cardid:h.cardid,numids:JSON.stringify(a),value:JSON.stringify(b)},f=c.get("/jsonapi",{params:e});207===a[0]&&d(h.checkSyncStatus,1e3),f.success(function(a,b,c,d){}),f.error(function(a,b,c){alert("Fail to send Card Controls to AlsaJsonGateway")})},h.init=function(){h.cardid=b.search().card,h.GetSessionsList(),h.GetSndControls()},h.init()}ngapp.addDirective("scarlettCapture",["$log","CtrlByNumid",scarletteCapture]),ngapp.addDirective("scarlettMaster",["$log",scarlettMaster]),ngapp.addController("ScarlettMixerController",["$log","$location","$http","$timeout","Notification","CtrlByNumid","LabelByUid",ScarlettController]);
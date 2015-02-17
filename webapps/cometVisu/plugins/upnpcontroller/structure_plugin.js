/* structure_plugin.js (c) 2012 by Mark K. [mr dot remy at gmx dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
*/

define("plugins/upnpcontroller/structure_plugin",["structure_custom","css!plugins/upnpcontroller/upnpcontroller"],function(e){function i(e,d,v){function S(e,n,i,o,u,a,f,l){n==0?($("#"+t+"_muteButton").removeClass("switchPressed"),$("#"+t+"_muteButton").addClass("switchUnpressed")):($("#"+t+"_muteButton").removeClass("switchUnpressed"),$("#"+t+"_muteButton").addClass("switchPressed")),i=="Play"?($("#"+t+"_playButton").removeClass("switchUnpressed"),$("#"+t+"_playButton").addClass("switchPressed")):($("#"+t+"_playButton").removeClass("switchPressed"),$("#"+t+"_playButton").addClass("switchUnpressed")),$("#"+y+"_muteButton div.value").text(n),$("#"+y+"_playButton div.value").text(i),$("#"+y+"_volume div.value").text(e),$("#"+y+"_title div.value").text(o),$("#"+y+"_artist div.value").text(f),$("#"+y+"_album div.value").text(l),$("#"+y+"_time div.value").text(u+" of "+a),r=s(u,a),p("song_process_rel: "+r),$("#"+y+"_progress").attr({value:r})}var e=$(e),m=e.data("player_ip"),g=e.data("player_port"),y=e.data("id"),b=e.data("eventsRegistered"),w=e.data("label"),E=e.data("refresh");return p("debug     : "+n),p("playerIp  : "+m),p("playerPort: "+g),$.ajax({type:"GET",datatype:"JSON",url:"plugins/upnpcontroller/status.php?player_ip_addr="+m+"&port="+g,success:function(e){n=="true"&&(console.log("volume          : "+e.volume),console.log("reltime         : "+e.reltimeResponse),console.log("durationResponse: "+e.durationResponse),console.log("title           : "+e.title)),S(e.volume,e.muteState,e.transportState,e.title,e.reltimeResponse,e.durationResponse,e.artist,e.album)}}),b<2&&($("#"+t+"_muteButton").bind("click",c),$("#"+t+"_playButton").bind("click",h),$("#"+t+"_next").bind("click",f),$("#"+t+"_prev").bind("click",l),$("#"+t+"_volumedown").bind("click",u),$("#"+t+"_volumeup").bind("click",a),$("#"+t+"_getplaylists").bind("click",o),e.data("eventsRegistered",b+1)),typeof E!="undefined"&&E&&v==0&&window.setTimeout(function(e,t){i(e,t,!1)},E*1e3,e,d),!1}function s(e,t){var n=0,r=0,i=0;return p("calculateSongProcessed"),durationParts=t.split(":"),r=Number(durationParts[2])+Number(durationParts[1])*60+Number(durationParts[0])*60*60,reltimeParts=e.split(":"),i=Number(reltimeParts[2])+Number(reltimeParts[1])*60+Number(reltimeParts[0])*60*60,p("secondsTotal    : "+r),p("secondsProcessed: "+i),n=Math.floor(i*100/r),n}function o(){p("click callgetplaylists");var e=$("#"+t),r=e.data("player_ip"),i=e.data("player_port"),s=$("#"+t+"_getplaylists").attr("value");p("currentValue: "+s),p("playerPort  : "+i),$.ajax({type:"GET",datatype:"JSON",url:"plugins/upnpcontroller/playlists.php?player_ip_addr="+r,success:function(e){var o="";p("totalMatches: "+e.totalMatches);for(var u=0;u<e.playLists.length;u++)o+="<a href='plugins/upnpcontroller/selectplaylist.php?player_ip_addr="+r+"&listurl="+e.playLists[u].urlenc+"&port="+i+"'>"+e.playLists[u].name+"</a></br>",n=="true"&&(console.log("name: "+e.playLists[u].name),console.log("url: "+e.playLists[u].url));s!="pressed"?($("#"+t+"_playlistsresult div.value").html(o),$("#"+t+"_getplaylists").attr({value:"pressed"}),$("#"+t+"_getplaylists").removeClass("switchUnpressed"),$("#"+t+"_getplaylists").addClass("switchPressed")):($("#"+t+"_playlistsresult div.value").text(""),$("#"+t+"_getplaylists").attr({value:"unpressed"}),$("#"+t+"_getplaylists").removeClass("switchPressed"),$("#"+t+"_getplaylists").addClass("switchUnpressed"))}})}function u(){p("click callvolumedown");var e=$("#"+t),n=e.data("player_ip"),r=e.data("player_port"),i=$("#"+t+"_volume div.value").text();p("currentVolume: "+i),p("playerPort  : "+r);var s=Number(i)-5;$.ajax({type:"GET",datatype:"JSON",url:"plugins/upnpcontroller/volume.php?player_ip_addr="+n+"&volume="+s+"&port="+r,success:function(e){console.log("data: "+e)}})}function a(){p("click callvolumeup");var e=$("#"+t),n=e.data("player_ip"),r=e.data("player_port"),i=$("#"+t+"_volume div.value").text();p("currentVolume: "+i),p("playerPort  : "+r);var s=Number(i)+5;$.ajax({type:"GET",datatype:"JSON",url:"plugins/upnpcontroller/volume.php?player_ip_addr="+n+"&volume="+s+"&port="+r,success:function(e){p("data: "+e)}})}function f(){p("click next");var e=$("#"+t),n=e.data("player_ip"),r=e.data("player_port");p("playerPort  : "+r),$.ajax({type:"GET",datatype:"JSON",url:"plugins/upnpcontroller/next.php?player_ip_addr="+n+"&port="+r,success:function(e){p("data: "+e)}})}function l(){p("click prev");var e=$("#"+t),n=e.data("player_ip"),r=e.data("player_port");p("playerPort  : "+r),$.ajax({type:"GET",datatype:"JSON",url:"plugins/upnpcontroller/prev.php?player_ip_addr="+n+"&port="+r,success:function(e){p("data: "+e)}})}function c(){p("click mute");var e=$("#"+t),n=e.data("player_ip"),r=e.data("player_port"),s=$("#"+t+"_muteButton div.value").text();p("current muteValue: "+s),p("playerPort  : "+r),s==0?(s=1,$("#"+t+"_muteButton").removeClass("switchUnpressed"),$("#"+t+"_muteButton").addClass("switchPressed")):(s=0,$("#"+t+"_muteButton").removeClass("switchPressed"),$("#"+t+"_muteButton").addClass("switchUnpressed")),$.ajax({type:"GET",datatype:"JSON",url:"plugins/upnpcontroller/mute.php?mute="+s+"&player_ip_addr="+n+"&port="+r,success:function(e){p("data: "+e)}}),i(e,{},!0)}function h(){p("click play");var e=$("#"+t),n=e.data("player_ip"),r=e.data("player_port"),s=$("#"+t+"_playButton div.value").text(),o;p("current playValue: "+s),p("playerPort  : "+r),s=="Play"?(o="pause",$("#"+t+"_playButton").removeClass("switchUnpressed"),$("#"+t+"_playButton").addClass("")):(o="play",$("#"+t+"_playButton").removeClass("switchPressed"),$("#"+t+"_playButton").addClass("switchUnpressed")),$.ajax({type:"GET",datatype:"JSON",url:"plugins/upnpcontroller/"+o+".php?player_ip_addr="+n+"&port="+r,success:function(e){p("data: "+e)}}),i(e,{},!0)}function p(e){n=="true"&&console.log(e)}var t,n,r;e.prototype.addCreator("upnpcontroller",{create:function(e,r){function o(){var e=new Date;return e.getTime()}var s=$(e),u="upnpcontroller_"+o();t=u;var a=$('<div class="widget upnpcontroller" />');templateEngine.design.setWidgetLayout(a,s);var f='<div class="label">'+s.attr("label")+"</div>",l=$('<div class="actor"><div class="upnpcontroller" id="'+u+'">loading</div></div>'),c=$("#"+u,l);return controller=$("<div></div>"),controller.append("<div id='"+u+"_title' class='upnplabelgroup'><div class='upnplabel'>Title</div><div class='value'>-</div></div>"),controller.append("<div id='"+u+"_artist' class='upnplabelgroup'><div class='upnplabel'>Artist</div><div class='value'>-</div></div>"),controller.append("<div id='"+u+"_album' class='upnplabelgroup'><div class='upnplabel'>Album</div><div class='value'>-</div></div>"),controller.append("<div id='"+u+"_time' class='upnplabelgroup'><div class='upnplabel'></div><div class='value'>-</div></div>"),controller.append("<div style='float: left;'><progress id='"+u+"_progress'  max='100' value='0'></progress></div>"),controller.append("<div style='float: left;'><div id='"+u+"_volumedown' class='actor center switchUnpressed'><div class='value'>-</div></div>"+"<div id='"+u+"_volume' class='actor center switchInvisible' style='text-align: center;'><div class='value'>20</div></div>"+"<div id='"+u+"_volumeup' class='actor center switchUnpressed'><div class='value'>+</div></div></div>"),controller.append("<div style='float: left;'><div id='"+u+"_playButton' class='actor switchUnpressed center'><div class='value'>-</div></div>"+"<div id='"+u+"_muteButton' class='actor switchUnpressed center'><div class='value'>-</div></div>"),controller.append("<div style='float: left;'><div id='"+u+"_prev' class='actor switchUnpressed center'><div class='value'>prev</div></div>"+"<div id='"+u+"_next' class='actor switchUnpressed center'><div class='value'>next</div></div></div>"),controller.append("<div style='float: left;'><div id='"+u+"_getplaylists' class='actor switchUnpressed center'><div class='value'>play lists</div></div></div>"),controller.append("<div style='float: left;'><div id='"+u+"_playlistsresult'><div class='value'></div></div></div>"),c.html(controller),a.append(f).append(l),c.data("id",u),c.data("eventsRegistered",0),c.data("label",s.attr("label")),c.data("refresh",s.attr("refresh")),c.data("player_ip",s.attr("player_ip_addr")),c.data("debug",s.attr("debug")),s.attr("player_port")!=undefined?c.data("player_port",s.attr("player_port")):c.data("player_port","1400"),n=s.attr("debug"),i(c,{},!1),a}})});
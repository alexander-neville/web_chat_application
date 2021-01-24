var active_id;
function open_pane(evt, chat_room_index) {

    active_id = chat_room_index;
    var i, right, tablinks;

    right = document.getElementsByClassName("right");
    for (i = 0; i < right.length; i++) {
        right[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(chat_room_index).style.display = "block";
    evt.currentTarget.className += " active";
    fetch_messages(chat_room_index);
}

function toggle_chat_menu() {}

function send_message_ajax(chat_room_id) {

    var text = document.getElementById(chat_room_id).getElementsByClassName("new")[0].getElementsByTagName("input")[0].value;

    var xhr = new XMLHttpRequest();
    var data = "send="+chat_room_id+","+text;

    xhr.open('POST', 'process.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){}    
    xhr.send(data);

    document.getElementById(chat_room_id).getElementsByClassName("new")[0].getElementsByTagName("input")[0].value = "";


}

function fetch_messages(chat_room_id) {

    if (chat_room_id == null) {

        chat_room_id = active_id;

    }

    var xhr = new XMLHttpRequest();
    var data = "fetch="+chat_room_id;

    xhr.open('POST', 'process.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){

        var message_area = document.getElementById(chat_room_id).getElementsByClassName("messages")[0].innerHTML;
        message_area=message_area+this.responseText;
        document.getElementById(chat_room_id).getElementsByClassName("messages")[0].innerHTML = message_area;

    } 
    xhr.send(data);
    var objDiv = document.getElementById(chat_room_id).getElementsByClassName("messages")[0];
    objDiv.scrollTop = objDiv.scrollHeight;
}

function join_chat_room(){

    var id = document.getElementsByClassName("left")[0].getElementsByClassName("chat_menu")[0].getElementsByTagName("input")[0].value;
    var pin = document.getElementsByClassName("left")[0].getElementsByClassName("chat_menu")[0].getElementsByTagName("input")[1].value;
    document.getElementsByClassName("left")[0].getElementsByClassName("chat_menu")[0].getElementsByTagName("input")[0].value = "";
    document.getElementsByClassName("left")[0].getElementsByClassName("chat_menu")[0].getElementsByTagName("input")[1].value = "";
    var xhr = new XMLHttpRequest();
    var data = "join="+id+"###"+pin;

    xhr.open('POST', 'process.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){

        if (this.responseText == "0") {

            alert("Incorrect join code or pin");

        } else {

            console.log(this.responseText);

        }
    }    
    xhr.send(data);

}
function create_chat_room(){

    var name = document.getElementsByClassName("left")[0].getElementsByClassName("chat_menu")[0].getElementsByTagName("input")[0].value;
    var pin = document.getElementsByClassName("left")[0].getElementsByClassName("chat_menu")[0].getElementsByTagName("input")[1].value;
    document.getElementsByClassName("left")[0].getElementsByClassName("chat_menu")[0].getElementsByTagName("input")[0].value = "";
    document.getElementsByClassName("left")[0].getElementsByClassName("chat_menu")[0].getElementsByTagName("input")[1].value = "";

    var xhr = new XMLHttpRequest();
    var data = "create="+name+"###"+pin;

    xhr.open('POST', 'process.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){

        console.log(this.responseText);
        
    }

    xhr.send(data);

}
    
var update = setInterval(fetch_messages, 1000);

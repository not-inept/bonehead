var dna = [];

/*structure of dna 
bones - list of bone nodes
	bone node
		name - string name, unique to bones
		parent - parent bone node (name)
		rotation,x,y,height,width - respective position values
slots - list of slot nodes
	slot node
		name - string name, unique to slots
		bone - bone attached to
		attachment - bone/slot attached to
skins - list of skin nodes


*/

var minBox = function(type, size) {
	if (type == 'left' || type == 'right') {
		if (size == 15) {
			document.getElementById(type).style.width = "2%";
			if (type == 'left') {
				document.getElementById('center').style.left = 
				document.getElementById('bottom').style.left = 
				"2%";
			} else {
				document.getElementById('center').style.right = 
				document.getElementById('bottom').style.right =
				"2%";
			}
			document.getElementById(type).setAttribute("ondblclick", "minBox('"+type+"',2);");
		} else {
			document.getElementById(type).style.width = "15%";
			if (type == 'left') {
				document.getElementById('center').style.left = 
				document.getElementById('bottom').style.left = 
				"15%";
			} else {
				document.getElementById('center').style.right = 
				document.getElementById('bottom').style.right =
				"15%";
			}
			document.getElementById(type).setAttribute("ondblclick", "minBox('"+type+"',15);");
		}
	} else if (type == "bottom") {
		if (size == 15) {
			document.getElementById('bottom').style.height =
			document.getElementById('center').style.bottom =
			"2%";
			document.getElementById(type).setAttribute("ondblclick", "minBox('"+type+"',2);");

		} else {
			document.getElementById('bottom').style.height =
			document.getElementById('center').style.bottom =
			"15%";
			document.getElementById(type).setAttribute("ondblclick", "minBox('"+type+"',15);");
		}
	} /*else if (type == "center") {
		
		if (size == 0) {
			document.getElementById('center').style.top =
			document.getElementById('center').style.bottom =
			document.getElementById('center').style.left =
			document.getElementById('center').style.right =
			"0%";		
			document.getElementById(type).setAttribute("ondblclick", "minBox('"+type+"',1);");

		}
		
	}*/
};

var toggleSquishy = function(id) {
	interact('#'+id)
	  .resizable(true)
	  .on('resizemove', function (event) {
	    var target = event.target;

	    // add the change in coords to the previous width of the target element
	    var newWidth  = parseFloat(target.style.width ) + event.dx,
	        newHeight = parseFloat(target.style.height) + event.dy;

	    // update the element's style
	    target.style.width  = newWidth + 'px';
	    target.style.height = newHeight + 'px';

	    target.textContent = newWidth + '×' + newHeight;
	  })
	  .draggable({
	    // enable inertial throwing
	    inertia: true,
	    // keep the element within the area of it's parent
	    restrict: {
	      restriction: "parent",
	      endOnly: true,
	      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
	    },

	    // call this function on every dragmove event
	    onmove: function (event) {
	      var target = event.target,
	          // keep the dragged position in the data-x/data-y attributes
	          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
	          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	      // translate the element
	    	obj = document.getElementById(id);
			cur = obj.style.transform.split(') ');
			if (cur.length >= 2) {
				console.log(cur.length)
				cur[0] += ')';
				angle = cur[1].split('(')[1].replace('rotate(','').replace('deg)','');
				angle = parseFloat(angle, 10);
			} else {
				angle = 100;
			}
	    	target.style.webkitTransform =
	    	target.style.transform =
	        'translate(' + x + 'px, ' + y + 'px)' + ' rotate('+angle+'deg)';

	      // update the posiion attributes
	      target.setAttribute('data-x', x);
	      target.setAttribute('data-y', y);
	    },
	    // call this function on every dragend event
	    onend: function (event) {
	      var textEl = event.target.querySelector('p');

	      textEl && (textEl.textContent =
	        'moved a distance of '
	        + (Math.sqrt(event.dx * event.dx +
	                     event.dy * event.dy)|0) + 'px');
	    }
	  });


};

var buildWorkspace = function() {
	var ws = '<div id="top" class="tran" ondblclick="minBox(\'top\',0);"></div> \
	<div id="left" class="tran" ondblclick="minBox(\'left\',2);"></div> \
	<div id="right" class="tran" ondblclick="minBox(\'right\',15);"></div> \
	<div id="center" class="tran" ondblclick="minBox(\'center\',0);">';

	//add flesh and bones to workspace here
	ws += '<div class="flesh" id="root" style="width: 200px; height: 200px;"></div>';

	ws += 	'</div> \
	<div id="bottom" class="tran" ondblclick="minBox(\'bottom\',15);"></div>';

	var body = document.getElementsByTagName('body')[0];
	body.innerHTML = ws;
};

var cloneDNA = function(dna) {
	buildWorkspace();
};

buildWorkspace();
toggleSquishy('root');
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        console.log("up arrow");
    }
    else if (e.keyCode == '40') {
      	// down arrow
       	console.log("down arrow");

    }
    else if (e.keyCode == '37') {
       	// left arrow
		console.log("left arrow");
		obj = document.getElementById('root');
		cur = obj.style.transform.split(') ');
		cur[0] += ')';
		angle = cur[1].split('(')[1].replace('rotate(','').replace('deg)','');
		angle = parseFloat(angle, 10);
		angle+=1;
       	obj.style.webkitTransform =
    	obj.style.transform = cur[0] + ' rotate(' + angle + 'deg)';
    }
    else if (e.keyCode == '39') {
       // right arrow
       console.log("right arrow");
       	obj = document.getElementById('root');
		cur = obj.style.transform.split(') ');
		cur[0] += ')';
		angle = cur[1].split('(')[1].replace('rotate(','').replace('deg)','');
		angle = parseFloat(angle, 10);
		angle-=1;
       	obj.style.webkitTransform =
    	obj.style.transform = cur[0] + ' rotate(' + angle + 'deg)';
    }

}
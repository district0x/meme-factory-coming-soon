var mobile = false;
var mobileBreak = 768;
if($(window).width() <= mobileBreak){mobile = true;}
var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var path;
function freezePage(){$('body').css({'width':'100%','height':'100%','overflow':'hidden'});}
function unfreezePage(){$('body').css({'width':'','height':'','overflow':''});}





//! WINDOW RESIZE

var winW;
var winH;
$(window).resize(function(){
	winW = $(window).width();
	winH = $(window).height();
	//console.log(winW);
})





//! GLOBAL MENU

var menuOpen = false;

$('.menuLines').mouseenter(function(){
	TweenMax.to($(this).siblings('.menu-icon').find('.bg'), .75, {'transform':'translate3d(-10px, 10px, 0px)', ease:Elastic.easeOut, easeParams:[2,3]})
})
$('.menuLines').mouseleave(function(){
	TweenMax.to($(this).siblings('.menu-icon').find('.bg'), .75, {'transform':'translate3d(0px, 0px, 0px)', ease:Elastic.easeOut, easeParams:[3,2]})
})

$('.menuLines').click(function(){
	
	if(!menuOpen){
		openMenu();
		
	} else {
		closeMenu();
	}
	
	return false;
})

	
function openMenu(){	
	menuOpen = true;
	
	// animate lines into X
	TweenMax.to($('.menuLines .top'), .75, {delay:.1, rotation:-45, top:0, ease:Back.easeInOut, easeParams:[3,1]})
	TweenMax.to($('.menuLines .mid'), .2, {delay:.3, opacity:0})
	TweenMax.to($('.menuLines .bottom'), .75, {delay:.1, rotation:45, top:0, ease:Back.easeInOut, easeParams:[3,1]})	
	
	// expand blob
	$('.menu-wrap').css({'display':'block'});
	$('.menu-blob').css({'transform':'translate3d(800px, -2000px, 0px)'});
	
	// start bg blob animations
	$('#globalMenu').find('.blobmover').each(function(i){
		$(this).find('.floater').addClass('blobfloat3');
		$(this).find('.icon').addClass('blobfloatInner'+blobseq2[i]);
	})
	
	// setup menu parts
	$('#globalMenu').addClass('open');
	TweenMax.to($('.menu-icon').find('.bg'), .5, {scaleX:2, scaleY:2, ease:Back.easeIn});
	TweenMax.to($('.menu-blob'), 1, {delay:.3, 'transform':'translate3d(0px, 0px, 0px)', ease:Elastic.easeOut, easeParams:[2,4], onComplete:function(){
		freezePage();
	}});
	
	bDel = .5;
	
	TweenMax.to($('.mobile-logo, .menu-wrap .toplinks.dsk'), .3, {delay:.5, opacity:1})
	TweenMax.to($('.mobile-links'), .3, {delay:.5, opacity:1})
}

function closeMenu(){	
	// animate lines back to burger
	TweenMax.to($('.menuLines .top'), .75, {rotation:0, top:-9, ease:Elastic.easeInOut, easeParams:[3,1]})
	TweenMax.to($('.menuLines .mid'), .2, {delay:.2, opacity:1})
	TweenMax.to($('.menuLines .bottom'), .75, {rotation:0, top:9, ease:Elastic.easeInOut, easeParams:[3,1]})	
	
	// shrink blob
	TweenMax.to($('.menu-icon').find('.bg'), .75, {delay:.3, startAt:{scaleX:3, scaleY:3}, scaleX:1, scaleY:1, ease:Elastic.easeOut, easeParams:[3,4]});
	TweenMax.to($('.menu-blob'), 1, {'transform':'translate3d(800px, -2000px, 0px)', ease:Back.easeInOut, easeParams:[1,4], onComplete:function(){
		$('.menu-wrap').css({'display':'none'});
		$('#globalMenu').removeClass('open');
		
		// remove bg blob animations
		$('#globalMenu').find('.blobmover').each(function(i){
			$(this).find('.floater').removeClass('blobfloat3');
			$(this).find('.icon').removeClass('blobfloatInner'+blobseq2[i]);
		})
	
		menuOpen = false;
	}})
	
	TweenMax.to($('.menu-wrap .toplinks.dsk, .mobile-logo, .mobile-links, #globalNav ul'), .3, {opacity:0})
	
	unfreezePage();
	TweenMax.to($('.menu-icon').find('.bg'), .75, {'transform':'translate3d(0px, 0px, 0px)', ease:Elastic.easeOut, easeParams:[3,2]})
}

var blobseq1 = [1,1,2,1,2,1];
var blobseq2 = [1,2,2,1,2,1];
var blobseqM = [6,6,7,6,7,6];
var distblobseq1 = [];
var distblobseq2 = [];
distblobseq1[0] = [4,5,5];
distblobseq2[0] = [1,2,2];
distblobseq1[1] = [4,5];
distblobseq2[1] = [1,2];
distblobseq1[2] = [4,5,4];
distblobseq2[2] = [1,2,1];
distblobseq1[3] = [5,4];
distblobseq2[3] = [2,1];
distblobseq1[4] = [5,5,4];
distblobseq2[4] = [2,1,1];






//! FORM SUBMIT

var formSent = false;
var formURL = $('#email-form').attr('action');

$('#email-form').submit(function(){
	if(validateForm($(this))){
		sendForm();
	}
	return false;
});

function sendForm(){

// animation actions

var formData = $('#email-form').serialize();

$.ajax({
    url: formURL,
    type: 'GET',
    data: formData,
	dataType: "jsonp",
    jsonp: "c",
    contentType: "application/json; charset=utf-8",
        
    success: function(data){					
		formSent = true;
		//console.log(data.result);
		$('input[name="email"]').val('');
		TweenMax.to('.thanks', .5, {'opacity':1, 'display':'block'})
    }
});

}

function validateForm(formObj){	
	var vNum = 0;
	$(formObj).find('[data-type="req"]').each(function(){
		if($(this).val() == ""){
			vNum++;
		}
	});
	if(vNum==0){
		return true;
	} else {
		$('.email-wrap').addClass('error');
		return false;
	}
}

$('input').focus(function(){
	TweenMax.to('.thanks', .5, {'opacity':0, 'display':'none'});
	$('.email-wrap').removeClass('error');
	formSent = false;	
})




//var boxDel = .61;
var boxDel = 1.49;

$('.memebox').each(function(i){
	del = i*boxDel;
	$(this).css({'animation-delay':-del+'s'});
	$(this).find('.inner').css({'animation-delay':-del+'s'});
	$(this).addClass('boxmove');
	$(this).find('.inner').addClass('boxdrop');
})





freezePage();
$(window).on('load', function(){
	$(window).resize();
	TweenMax.to('#loader', .5, {delay:.2, opacity:0, 'display':'none', onComplete:function(){
		unfreezePage();
	}});
})






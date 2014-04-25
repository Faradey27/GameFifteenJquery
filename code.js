    var blocks = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]; // ������ ��������
    var numberr; // ������� ��� �������
    var nl; //temp elem
    var tim;
    var numchange = 10; //����� �������
    $(document).ready(function inizialize() { //����� �������� ���������
        //�������� ��������
        $('body').append('<div class="all"></div>');
        $('.all').append('<div class="score"></div>');
        $('.all').append('<div class="field">');
        $('.score').append('<p class="number">Move:</p>');
        $('.score').append('<p class="number dig">0</p>');
            for (var i=0; i<15; i++) {
                $('.field').append('<div class=\"block\" onclick=\"change(this)\"'+'data-x=\"'+(i+1)+'\"><p class="num">'+(i+1)+'</p></div>');
            }
            $('.field').append('<div class="last" data-x="16">');
            //����������
            mixed();//������
            tim = setInterval(end, 200); // ��������� ������� ������
            $(document).bind('keyup', function() {
                if (event.keyCode == 39) {
                    $(".block").stop(true,true); //������������� ��� ��������
                    var n1=getLeftNum();// �������� ������� �����
                    var n2=getLastNum();//�������� ������ ������
                    if (!(n2%4==0)) // ���� �� �� ���� ���� 
                    $('.block:eq('+n1+')').click(); //�����������             
                }
                    else    
                        if (event.keyCode == 37) {
                            $(".block").stop(true,true);
                            n1=getRightNum()-1;
                            n2=getLastNum();
                            if (n2!=3 && n2!=7 && n2!= 11 && n2!=15)
                                $('.block:eq('+n1+')').click();           
                        }
                    else    
                        if (event.keyCode == 40) {
                            $(".block").stop(true,true);
                            n2=getLastNum();
                            n1=n2-4;
                            $('.block:eq('+n1+')').click();           
                        }
                    else
                        if (event.keyCode == 38) {
                            $(".block").stop(true,true);
                            n2=getLastNum();
                            n1=n2+3;
                            $('.block:eq('+n1+')').click();           
                        }
            });
    })
    
    function mixed() { //������� �������
       for (var j =0; j<numchange; j++) { //������ 10 ������������ ������ �������
            var thisnum = ~~(Math.random()*15); //�������� ���������
            var lastnum = ~~(Math.random()*14);
            if (lastnum==thisnum) {//���� ������� ���� � ����
                lastnum+=1;// ������� ���������
            }
            numberr=-7;//������� ��� �������
            $('.block:eq('+thisnum+')').swap('.block:eq('+lastnum+')');//������ ������� ����
            var temp = blocks[thisnum];//����������� ��������������� �������� �������
            blocks[thisnum] = blocks[lastnum];
            blocks[lastnum] = temp;
        }
    }
    
    function getLeftNum() { //���� ������� ����� ����������
        for (var i=0; i<blocks.length;i++) {
            if (blocks[i]==16) {
                var p = i;
            }
        }
        return (p-1);
    }
    
    function getRightNum() {
        for (var i=0; i<blocks.length;i++) {
            if (blocks[i]==16) {
                var p = i;
            }
        }
        return (p+1);
    }
    
    function getLastNum() {
        for (var i=0; i<blocks.length;i++) {
            if (blocks[i]==16) {
                var p = i;
            }
        }
        return p;
    }

    function sort(a,b) {
        return(a-b); //�������� �������
    }
    score.counter = -numchange;
    function score(args) {
        score.counter++;// ������� ����
    }
    
    
 
    function change(elem) {
        var thisnum = find(1*elem.getAttribute("data-x"),blocks); // �������� ������� �����
        var lastnum = find(1*$('.last').attr('data-x'),blocks); //������ �����
        if (thisnum===lastnum+1 || thisnum===lastnum-1 || thisnum===lastnum-4 || thisnum===lastnum+4) { //���� ���� �������    
            var temp = blocks[thisnum]; //������ ��������������� �������� �������
            blocks[thisnum] = blocks[lastnum];
            blocks[lastnum] = temp;
            nl=elem;// ��������� �����
            numberr=thisnum-lastnum; //��� ��������, ����� ��� �������          
            $('.last').swap(elem);  //������ �������    
        }
    }
    
    function end() {
        $('.dig').html(score.counter);
        var tblocks = []; //������ ������
        for (var i=0; i<blocks.length;i++) {
            tblocks[i]=blocks[i];//��������� ������ ����������
        }
            tblocks.sort(sort);//���������
        if (equal(tblocks,blocks)) {//���� ��� ���� �������������, ������ �������
            $('#scor').html("You made " +score.counter+" moves to collect puzzle. Please enter your name, to save record:");
            $('.window').css("visibility","visible");
            $('#myModal').modal('show');
            clearInterval(tim);
        }
    }
    
    function equal(a,b) { //������� ��������� ��������
        for (var i=0; i<a.length; i++) {
            if (a[i]!=b[i]) {
                return false
            }
        }
            return true;    
    }
      
    function find(elem,mas) {
        for (var i = 0; i<mas.length; i++)
            if (mas[i]===elem) return i;
        return false;
            
    }
     
    jQuery.fn.swap = function(b) { //������ ������� ��� ����
        b = jQuery(b)[0];
        var a = this[0];
        score();
        console.log(score.counter);
        a2 = a.cloneNode(true);
        b2 = b.cloneNode(true);
        if (numberr==-7) {
           a.parentNode.replaceChild(b2, a);
           b.parentNode.replaceChild(a2, b);
        }
            else
                if (numberr==-1) 
                    $(b).stop().animate({left:"+="+$(".block").width()+"px"},150, function() {
                    a.parentNode.replaceChild(b2, a);
                    b.parentNode.replaceChild(a2, b);
                });
            else
                if (numberr==1) 
                    $(b).stop().animate({left:"-="+$(".block").width()+"px"},150, function() {
                    a.parentNode.replaceChild(b2, a);
                    b.parentNode.replaceChild(a2, b);
                    });
            else
                if (numberr==-4) 
                    $(b).stop().animate({top:"+="+$(".block").width()+"px"},150, function() {
                    a.parentNode.replaceChild(b2, a);
                    b.parentNode.replaceChild(a2, b);
                });
            else
                if (numberr==4) 
                    $(b).stop().animate({top:"-="+$(".block").width()+"px"},150, function() {
                    a.parentNode.replaceChild(b2, a);
                    b.parentNode.replaceChild(a2, b);
                     });
       };
     

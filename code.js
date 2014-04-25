    var blocks = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]; // массив пятнашек
    var numberr; // костыль для тасовки
    var nl; //temp elem
    var tim;
    var numchange = 10; //число тасовок
    $(document).ready(function inizialize() { //после загрузки документа
        //начинаем рисовать
        $('body').append('<div class="all"></div>');
        $('.all').append('<div class="score"></div>');
        $('.all').append('<div class="field">');
        $('.score').append('<p class="number">Move:</p>');
        $('.score').append('<p class="number dig">0</p>');
            for (var i=0; i<15; i++) {
                $('.field').append('<div class=\"block\" onclick=\"change(this)\"'+'data-x=\"'+(i+1)+'\"><p class="num">'+(i+1)+'</p></div>');
            }
            $('.field').append('<div class="last" data-x="16">');
            //нарисовали
            mixed();//тасуем
            tim = setInterval(end, 200); // проверяем условие победы
            $(document).bind('keyup', function() {
                if (event.keyCode == 39) {
                    $(".block").stop(true,true); //останавливаем все анимации
                    var n1=getLeftNum();// получаем елемент левее
                    var n2=getLastNum();//получаем пустую клетку
                    if (!(n2%4==0)) // если не на краю ряда 
                    $('.block:eq('+n1+')').click(); //передвигаем             
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
    
    function mixed() { //функция тасовки
       for (var j =0; j<numchange; j++) { //меняем 10 произвольных клеток местами
            var thisnum = ~~(Math.random()*15); //выбираем случайную
            var lastnum = ~~(Math.random()*14);
            if (lastnum==thisnum) {//если выбрали одну и туже
                lastnum+=1;// ыбираем следующую
            }
            numberr=-7;//костыль для тасовки
            $('.block:eq('+thisnum+')').swap('.block:eq('+lastnum+')');//меняем местами дивы
            var temp = blocks[thisnum];//пересталяем соответствующие элементы массива
            blocks[thisnum] = blocks[lastnum];
            blocks[lastnum] = temp;
        }
    }
    
    function getLeftNum() { //ищем элемент левее последнего
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
        return(a-b); //выбираем большее
    }
    score.counter = -numchange;
    function score(args) {
        score.counter++;// считаем ходы
    }
    
    
 
    function change(elem) {
        var thisnum = find(1*elem.getAttribute("data-x"),blocks); // получаем текущий кусок
        var lastnum = find(1*$('.last').attr('data-x'),blocks); //пустой кусок
        if (thisnum===lastnum+1 || thisnum===lastnum-1 || thisnum===lastnum-4 || thisnum===lastnum+4) { //если моно двигать    
            var temp = blocks[thisnum]; //меняем соответствующие элементы массива
            blocks[thisnum] = blocks[lastnum];
            blocks[lastnum] = temp;
            nl=elem;// временная перем
            numberr=thisnum-lastnum; //для тассовки, знать что двигать          
            $('.last').swap(elem);  //меняем местами    
        }
    }
    
    function end() {
        $('.dig').html(score.counter);
        var tblocks = []; //пустой массив
        for (var i=0; i<blocks.length;i++) {
            tblocks[i]=blocks[i];//заполняем нашими пятнашками
        }
            tblocks.sort(sort);//сортируем
        if (equal(tblocks,blocks)) {//если наш раин сортированому, значит собрали
            $('#scor').html("You made " +score.counter+" moves to collect puzzle. Please enter your name, to save record:");
            $('.window').css("visibility","visible");
            $('#myModal').modal('show');
            clearInterval(tim);
        }
    }
    
    function equal(a,b) { //функция сравнения массивов
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
     
    jQuery.fn.swap = function(b) { //меняем местами два дива
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
     

$(function(){
    // m-menu 나오고 들어가기
    $("#header .m-view").click(function(e){

        e.preventDefault();

        $("#header .m-menu").addClass("on");
    });

    $("#header .m-menu .close").click(function(e){

        e.preventDefault();

        $("#header .m-menu").removeClass("on");
    });

    // 스크롤 cont2 가면 gnb바 화면 상단 고정
    $(window).scroll(function(){

        let scTop = $(this).scrollTop(); 

        let cont2 = $('.cont2').offset().top;

        if(scTop >= cont2 - 350)
        {
            $("#header").addClass("fixed");
            setTimeout(() => {
                $("#header .pc-menu").addClass("on");
            }, 10);
            setTimeout(() => {
                $("#header .pc-menu").addClass("active");
            }, 100);
        }
        else
        {
            $("#header").removeClass("fixed");
            $("#header .pc-menu").removeClass("on");
            $("#header .pc-menu").removeClass("active");
        }


    });

    // 스크롤 기능
    const gnb = document.querySelectorAll("#header .gnb li");
    const sections = document.querySelectorAll("#container > div")

    // 스크롤Y 위치값에 따라 gnb on
    window.addEventListener("scroll",()=>{
        let scTop = window.scrollY;

        for(let i = 0; i < gnb.length; i++)
        {
            gnb[i].classList.remove("on");
        }

        if(scTop >= sections[0].offsetTop && scTop < sections[1].offsetTop)
        {
            gnb[0].classList.add("on");
        }
        else if(scTop >= sections[1].offsetTop && scTop < sections[2].offsetTop)
        {
            gnb[1].classList.add("on");
        }
        else if(scTop >= sections[2].offsetTop && scTop < sections[3].offsetTop)
        {
            gnb[2].classList.add("on");
        }
        else
        {
            gnb[3].classList.add("on");
        }
    });

    // gnb로 위치제어
    for(let i=0; i < gnb.length; i++)
    {
        gnb[i].addEventListener("click",(e)=>{

            e.preventDefault();

            let secOffset = sections[i].offsetTop;

            window.scrollTo({
                top:secOffset,
                left:0,
                behavior:"smooth"
            })
        })
    }
    
    // cont4 slider
    const swiper = new Swiper('.cont4 .swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        mousewheel: true,
        speed: 700,
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          size: 13,
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
     


    //배경이미지 등장 모션효과
    const wrapper = $(".perspective");
    //사각형 등장하는 애들 감싸는 역할

    let row = 4; // 행 갯수
    let column = 5; // 열 (칸 갯수)

    let rowHeight = 100/row + "%;"; // 행 높이 50% 
    let columnWidth = 100/column + "%;"; // 옆 가로사이즈 20%

    let imgWidth = 100 * column + "%;"; // 500% 부모칸안에 자식 가로사이즈(배경이미지 들어갈 자식)
    let imgHeight = 100* row + "%;"; //200% 부모칸안에 자식 세로사이즈(배경이미지 들어갈 자식)

    let setStyle = 'transform:scale(0) skew(40deg) rotate(180deg);'; //효과 세팅(스타트)

    let newHtml = ""; // 문자열을 담아줄 변수(태그)

    for(let i=0; i<row; i++) //행단위로 실행(1줄 2줄 3줄 이런식으로)
    {
        for(let j=0; j<column; j++) //칸(열 실행 5번)
        {
             let delaySpeed = (column - j) * 0.25 + (row + i) * 0.25 - 1 + "s;";//딜레이 초수계산
             // 배경이미지 위치조정값
             let posleft = -j*100 + "%;"; // 0% -100% -200% -300% left 위치값
             let posTop = -i*100 + "%;"; // 0%  -100% top 위치값

             //태그 생성
             newHtml += "<div class='parent' style='width:"+columnWidth+"height:"+rowHeight+"transition-delay:"+delaySpeed+setStyle+"'>";
            //  <div class="parent" style="width:20%;height:50%;transition-delay:1s;transform:scale(0.1) skew(45deg) rotate(90deg)">
             newHtml += "<div class='child' style='width:"+imgWidth+"height:"+imgHeight+"left:"+posleft+"top:"+posTop+"'></div>";
             newHtml += "</div>";
        }
    }

    wrapper.html(newHtml); // 태그 생성후 perspective 에다가 넣어줌

    //화면이 열리고 0.2초 혹은 0.3초뒤에 active클래스를 parent에다가 붙여줌
    setTimeout(function(){

        $(".cont1 .parent").addClass("active");

    },100);

    // AOS 연결
    AOS.init();
});
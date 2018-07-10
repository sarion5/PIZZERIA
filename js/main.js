jQuery(document).ready(function ($) {

    function createDynamicMainMenu(json) {

        var listMainMenu = `<h1 class="w3-center w3-jumbo" style="margin-bottom:64px">THE MENU</h1>`
        listMainMenu += `<div class="w3-row w3-center w3-border w3-border-dark-grey">`
        listMainMenu += `<div class="w3-row w3-center w3-border w3-border-dark-grey dynaMenu">`;

        for (var [keys] of Object.entries(json)) {
            listMainMenu += `<a href="#${keys}" class="openMenu">`
            listMainMenu += `<div class="w3-col s4 tablink w3-padding-large w3-hover-red">${keys}</div></a>`
        }

        listMainMenu += `</div></div>`;

        return listMainMenu;
    }

    var onLoadOfLuigisWebsite = function (json) {


        //1) Transition sur le menu (animation scroll)
        //********************************************
        $("a.smoothScroll").click(function (event) {

            //on récupère l'id du lien sur lequel on clique
            var href = $(this).attr("href");

            //hauteur de mon menu
            var myNavbarHeight = $("#myNavbar").height();

            //on vérifie l'ancre comme 1er caractere
            //si ce n'est pas le cas, on ne fait rien 
            //(ex: je pourrais avoir un lien vers un site externe comme www.google.be au lieu de #monAncre)
            if (href.charAt(0) == "#") {
                //J'enleve le comportement par défaut du clique sur le lien
                event.preventDefault();

                var posTop = 0;

                //si on a précisé l'ancre ex: #monAncre
                if (href.length > 1) {
                    posTop = $(href).offset().top - $(".w3-bar").height() + myNavbarHeight;
                    //posTop++;
                }

                //on va animer la postion top jusqu'a atteindre la postion de mon élément
                var time = 500; //500ms
                var param = {
                    scrollTop: posTop
                };
                $("html").animate(param, time);

                //on ajoute l'ancre à l'url
                window.location.hash = href;

            }
        });

        //2)Mise en avant de la section
        //Evenement qui écoute le scroll de la page
        //https://api.jquery.com/scroll/
        //*********************************
        $(document).scroll(function () {

            //chaque section de la page a la classe « hSection »
            var hSection = $(".hSection");

            //postion courrante dans la page
            var topDocument = $(document).scrollTop();

            //hauteur de mon menu
            var myNavbarHeight = $("#myNavbar").height();

            //on boucle sur toutes les sections
            for (var i = 0; i < hSection.length; i++) {
                //section à l'index de la boucle
                var section = hSection.eq(i);
                //position top de la section
                var sectionTop = section.offset().top;
                //id de la section
                var id = section.attr("id");
                //lien correspondant à la section
                var menuLink = $("a[href='#" + id + "']");
                //hauteur de la section
                var sectionHeight = section.height();

                //on vérifie que l'on se trouve dans la section
                if (topDocument + myNavbarHeight > sectionTop && topDocument + myNavbarHeight < sectionTop + sectionHeight) {
                    menuLink.addClass("active");
                } else {
                    menuLink.removeClass("active");
                }
            }

        }); //End scroll

        /*
        //we call a function createDynamicMainMenu()
        //into the .html jQuery's method in order to re-create a new
        //main menu that is adaptable from the owner's interface
        */
        $("#mainMenu").html(createDynamicMainMenu(json));

        $("#Pizza").show();

        $(".openMenu").click(function (event) {
            event.preventDefault();

            var text = $(this).text();

            // test pull request

            function createDynamicDropMenu(json, text) {
                /*
                //as the text previously clicked by the user
                //refers directly to the var 'keys' from function createDynamicMainMenu()
                //we know for sure that it will always be refering to our json file.
                //Therefore, we can use our var 'text' to get the required array from the same json file
                //and select all needed contents easily.
                */

                for (var i = 0 ; i <json[text].length; i++){
                    console.log(json[text][i].name)
                }


                /* var listDropMenu = `<div id="${text}" class="w3-container menu w3-padding-32 w3-white">`

                for (var values of Object.values(json[text])) {
                    listDropMenu += `<h1>`
                    listDropMenu += `<b>${json[text].name}/b>`
                    if (json[text].details !== "none") {
                        listDropMenu += `<span class="w3-tag w3-${json[text].detailsColor} w3-round">`
                        listDropMenu += `${json[text].details}}</span>`
                    }
                    listDropMenu += `<span class="w3-right w3-tag w3-dark-grey w3-round">${json[text].price}</span>`
                    listDropMenu += `</h1>`
                    listDropMenu += `<p class = "w3-text-grey" >${json[text].ingredients}< /p>`
                    listDropMenu += `<hr>`
                }

                return listDropMenu; */
            }

            console.log(createDynamicDropMenu(json, text));

//    insert comment

            /*
            
            
            if (href === "#Pizza") {
                $(`a[href="${href}"] div`).addClass("w3-red");
                $(`a:not([href="${href}"]) div`).removeClass("w3-red");
                $(`#dropMenu div:not([href="#Pizza"])`).hide();
                $(href).show();
            } else if (href === "#Pasta") {
                $(`a[href="${href}"] div`).addClass("w3-red");
                $(`a:not([href="${href}"]) div`).removeClass("w3-red");
                $(`#dropMenu div:not([href="#Pizza"])`).hide();
                $(href).show();
            } else if (href === "#Starter") {
                $(`a[href="${href}"] div`).addClass("w3-red");
                $(`a:not([href="${href}"]) div`).removeClass("w3-red");
                $(`#dropMenu div:not([href="#Pizza"])`).hide();
                $(href).show();
            } */


        });
    }

    var onLoadingError = function () {
        alert("some files couldn't be loaded");
    }

    $.ajax({
            url: "./data/menu.json",
            method: "GET",
            dataType: "json",
            mimeType: "application/json"
        })
        .done(onLoadOfLuigisWebsite).fail(onLoadingError)

}); //End ready
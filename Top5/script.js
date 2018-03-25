$(function () {
    //when ready

    var $mainMenuItems = $("#main-menu ul").children("li"),
        $button = $("#buttons-menu ul").children("li"),

        totalMainMenuItems = $mainMenuItems.length,
        openedIndex = -1, //index du menu ouvert

        init = function () {

            bindEvents();
            allBW(true);

            if (validIndex(openedIndex)) { // si on veut img ouverte des le debut
                animateItem($mainMenuItems.eq(openedIndex), true, 700); // ouverture à l'affichage
                $button.eq(openedIndex).addClass('actif');
            }
        };


    bindEvents = function () {
        // click sur image
        $mainMenuItems.children(".images").click(function () {
            var newIndex = $(this).parent().index(); //index du this dans la liste
            //  $item = $mainMenuItems.eq(newIndex);
            checkAndAnimate(newIndex);
        });

        //click sur button
        $(".button").click(function () {
            var newIndex = $(this).index();
            checkAndAnimate(newIndex);
        });

        //hover
        $(".button").hover(
            function () {
                $(this).addClass('hovered');
            },
            function () {
                $(this).removeClass('hovered');
            }
        );
    }


    validIndex = function (indexToCheck) {
        return (indexToCheck >= 0 && indexToCheck < totalMainMenuItems);
    }

    animateItem = function ($item, toOpen, speed) {
        var $colorImage = $item.find(".color"),
            itemParam = toOpen ? {
                width: "420px"
            } : {
                width: "140px"
            }, //ouverture ou fermeture
            colorImageParam = toOpen ? {
                left: "0px"
            } : {
                left: "140px"
            };


        $colorImage.animate( // deplace l'img color sur celle en n&b
            colorImageParam, speed);

        $item.animate( // élargie l'item pour afficher l'img + texte
            itemParam, speed);
    }

    allBW = function (allBWbool) {
        param = allBWbool ? {
            left: "140px"
        } : {
            left: "0px"
        };
        for (i = 0; i < totalMainMenuItems; i++) { //centrage des img n&b
            $mainMenuItems.eq(i).animate(param, 250);
        }
    }

    checkAndAnimate = function (indexToCheckAndAnimate) {
        $item = $mainMenuItems.eq(indexToCheckAndAnimate);
        $but = $button.eq(indexToCheckAndAnimate);

        if (openedIndex === indexToCheckAndAnimate) { //fermeture d'un menu deja ouvert
            animateItem($item, false, 0);
            $but.removeClass('actif');
            allBW(true);
            openedIndex = -1; //index du menu ouvert

        } else { //ouverture
            if (validIndex(indexToCheckAndAnimate)) {
                if (openedIndex === -1) { //aucun menu ouvert
                    allBW(false);
                }

                $button.eq(openedIndex).removeClass('actif');
                $but.addClass('actif');
                animateItem($mainMenuItems.eq(openedIndex), false, 250); // fermeture de l'ancien
                openedIndex = indexToCheckAndAnimate;
                animateItem($item, true, 250);
            }
        }
    }

    init();

});

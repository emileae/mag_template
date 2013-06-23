$(document).ready(function(){
    
    /*dynamic content*/
    
    /*data to add*/
    
    // NBNBNBNBNBNB ID must be unique
    shoes = [
        {'name':'Demon 2.0', 'image':'demon2USD123.jpg', 'price':'123', 'id':'shoe_1', 'description':"The Demon 2.0 is a testament to our commitment to ultra-high performance rock shoes. Unlike other brand's high performance shoes, the Demon 2.0 is evidence that performance and comfort can go hand in hand. This paradoxical concept is achieved by incorporating our AES-3 Concave Sole technology, Power Flex Upper, and our new R2 Rand System that translates into a rock shoe with superior feel and fit. Projects beware!"},
        {'name':'Shark 2.0', 'image':'shark2USD119.jpg', 'price':'119', 'id':'shoe_2', 'description': "The Arch Flex provides an aggressive but comfortable fit that gives the shark an unparalleled level of performance. Built around the original Shark last, we've resurrected this old favorite providing new features to make this model the weapon of choice. By utilizing our 1.8mm R2 rand rubber, the Arch Flex system gives our redesigned Shark an unbelievably comfortable and glove-like fit. The elastic property in our R2 formula hugs and locks your foot in to place without the pain associated with other high performance shoes."},
        {'name':'Concept 2.0', 'image':'concept2USD109.jpg', 'price':'109', 'id':'shoe_3', 'description': "Following in Mad Rock's tradition of being an innovator, we've incoproated all of our next gen features into one shoe. We've spent countless hours developing a new a material called the Power Flex Upper which allows for a tight, glove-like fit WITHOUT the pain that is inherent with other performance shoes. By infusing a two-way brushed polyester material with our new Science Friction 3.0 formula, you can get that performance-like fit with minimal breaking in. The Con series models are also the first climbing shoes to incoporate the use of a 3D molded polycarbonate midsole. The Concept 2.0 uses our AES-1 Midsole design to provide a stiff flex that never breaks down. The combination of our AES-1 midsole and 3D molded rubber concave sole creates a cup that you can use to grab at features like a hand. A hemp foot bed keeps odors under control while also minimizing stretch. As with all of our new 2011 models, the Concept 2.0 is manufactured with our new R2 rand system that increases heel and arch tension but allows for a more sensitive and comfortable fit."},
        {'name':'Conflict 2.0', 'image':'conflict2USD109.jpg', 'price':'109', 'id':'shoe_4', 'description': "Mad Rock's Conflict 2.0 is one of the most advanced climbing shoe in existence. We've spent countless hours developing a new a material called the Power Flex Upper which allows for a tight, glove-like fit without the pain that is inherent with other performance shoes. By infusing a two-way brushed polyester material with our new Science Friction 3.0 formula, you can achieve that performance like fit right out of the box. The Con series models are also the first climbing shoes to incoporate the use of a 3D molded polycarbonate midsole. The Conflict 2.0 uses our AES-2 Midsole design to provide a moderate flex that never breaks down. The combination of our AES-2 midsole and 3D molded rubber concave sole creates a cup that you can use to grab at features like a hand. A hemp foot bed keeps odors under control and minimizes stretch. A perfect blend of comfort and performance, the Conflict 2.0 will never disappoint."},
        {'name':'Contact 2.0', 'image':'contact2USD105.jpg', 'price':'105', 'id':'shoe_5', 'description': "Following in Mad Rock's tradition of being an innovator, we've incoproated all of our next gen features into one shoe. We've spent countless hours developing a new a material called the Power Flex Upper which allows for a tight, glove-like fit WITHOUT the pain that is inherent with other performance shoes. By infusing a two-way brushed polyester material with our new Science Friction 3.0 formula, you can get that performance-like fit with minimal breaking in. As with all of our new 2011 models, the Contact2.0 is manufactured with our new R2 rand system that increases heel and arch tension but allows for a more sensitive and comfortable fit. A 3D molded sole combined with no mid sole makes this shoe fit like second skin. Very sensitive and very soft."},
        {'name':'Mugen Tech Lace 2.0', 'image':'mugentechlace2USD99.jpg', 'price':'99', 'id':'shoe_6', 'description': "The 2.0 upgrade includes our new proprietary material called the Power Flex Upper. It is a fusion of 2 way stretch brushed polyester and our Science Friction 3.0 rubber formula. The end result is a material that is super sticky, sensitive, comfortable, and envelopes your feet like no other climbing shoe before it. The new progessive angle 3D molded heel cup hooks, smears, jams and locks better than any other heel design out there by using only our Science Friction 3.0 climbing grade rubber formula. Synthetic upper keeps this vegan friendly shoe from stretching out. The hemp foot bed is inherently antimicrobial and antibacterial which keeps the shoes smelling fresh. Mugen Tech Lace 2.0 is our high performance all around shoe of choice that every climber should have in their inventory. Keep um' laced."},
        {'name':'Mugen Tech 2.0', 'image':'mugentech2USD99.jpg', 'price':'99', 'id':'shoe_7', 'description': "The 2.0 upgrade includes our new proprietary material called the Power Flex Upper. It is a fusion of 2 way stretch brushed polyester and our Science Friction 3.0 rubber formula. The end result is a material that is super sticky, sensitive, comfortable, and envelopes your feet like no other climbing shoe before it. The new progessive angle 3D molded heel cup hooks, smears, jams and locks better than any other heel design out there by using only our Science Friction 3.0 climbing grade rubber formula. The hemp foot bed is inherently antimicrobial and antibacterial which keeps the shoes smelling fresh. Mugen Tech 2.0 is our high performance all around shoe of choice that every climber should have in their inventory."},
        {'name':'Flash 2.0', 'image':'flash2USD83.jpg', 'price':'83', 'id':'shoe_8', 'description': "Mad Rock's iconic Flash has finally gotten a total redesign. The Flash's blend of comfort, durability, and performance has lead to its embrace by multitude of climbers. Over the years, the flash has been the subject of raving reviews and has won many accolades. So what could we do to make it even better? By mixing this time tested classic with our science proven innovations. The tradition leather upper has been combined with Synflex, a synthetic stretch material, to offer performance while maintaining a consistent plush fit. We've redesigned the 3D molded heel to maximize friction. The Flash 2.0 will also be the first climbing shoe on the market to incorporate Shock Gel to reduce the impact force on the heel. A everlasting poly-carbonate midsole give the Flash 2.0 a consistent and predictable flex through out the life of the shoe."},
        {'name':'Onsight', 'image':'onsightUSD79.jpg', 'price':'79', 'id':'shoe_9', 'description': "Similar to the massively popular Flash, the Onsight is a great all-around performer designed specifically for female climbers by using different lasts than the Flash. This shoe is tailored for women's feet: a slightly softer flex, and the interior volume is narrower overall, with a narrow heel and a higher instep than its Flash counterpart. The net result is a better fit that will translate to better performance. The Onsight also offers subtle embossed graphics and a different color palette to stand out from the crowd."},
        {'name':'Banshee', 'image':'bansheeUSD79.jpg', 'price':'79', 'id':'shoe_10', 'description': "Working off a similar design goal as the Onsight, the Banshee offers the same attributes and all-around performance as the Phoenix, but in a women's specific model. Using female lasts to ensure women a better fit than the unisex last of the Phoenix, the Banshee is also a lace-up to offer another degree of precise control. Round this out with subtle laser-etched graphics and an exclusive color palette to differentiate it from its counterpart, and you have a great all-day shoe with a superlative value-to-performance ratio."},
        {'name':'Phoenix', 'image':'phoenixUSD75.jpg', 'price':'75', 'id':'shoe_11', 'description': "Classic, traditional, high quality, and a great performer. Mad Rock's do-everything shoe has been around since day one, and while it has enjoyed improvements and subtle changes over the years, the Phoenix is still a great value in a traditional shoe, and remains one of our most popular models. This WAS your father's climbing shoe, and it'll likely be the choice of your kids as well."},
        {'name':'Drifter', 'image':'drifterUSD69.jpg', 'price':'69', 'id':'shoe_12', 'description': "Don't let this shoe's looks fool you. Having climbed grades up to V15, the Drifter proves an astonishingly great value. By steering clear of some of Mad Rock's more technical features, this wallet friendly classic puts competition on it's wake."},
        {'name':'Mad Monkey 2.0', 'image':'madmonkeyUSD39.jpg', 'price':'39', 'id':'shoe_13', 'description': "We've upgraded our ever popular Mad Monkey with two rear closure straps for even more size adjustability. Our new dual closure system prevents straps from scratching delicate ankles when cinching down for a tighter fit. Constructed with our stretchy SynFlex upper and our R2 rand system for ultra comfort, the Mad Monkey is perfect for little climbers who's feet still growing."},
    ];
    
    //load content into div with an id (#shoe_list in this case)
    for (var i = 0; i < shoes.length; i++) {
        $('#shoe_list').append('\
            <div class="fullw_auto space_top">\
                <img id="'+shoes[i]['id']+'" class="wh_img margin-center shoe_img" src="imgs/shoes/'+shoes[i]['image']+'">\
            </div>\
            <div class="fullw_auto txt-center space_bottom">\
                <div class="title_m">'+shoes[i]['name']+'</div>\
            </div>\
        ');
    };
    
    //Handling Popups
    
    $('body').on('tap click', '.shoe_img', function(){
        var id = $(this).attr('id');
        load_popup(id, shoes)
    });
    
    function load_popup(id, list){
        
        var $shoe_id = id;
        var description = "";
        var name = "";
        var price = "";
        for (var i = 0; i<list.length; i++){
            if (list[i]['id'] == $shoe_id){
                name = list[i]['name'];
                description = list[i]['description'];
                price = list[i]['price'];
            };
        };
        $('body').append('<div id="full_overlay"></div>\
            <div id="overlay_content"><div class="close_x_wrapper"><button class="close_x">X</button></div>\
            '+name+' - ('+price+')<br/>'+description+'</div>\
            ');
    };
    
    //Handling product clicks
    //var $product_li = $('.product_list').children('li');
    $('body').on('tap click', '.product_img', function(){
        var product_id = $(this).parent('div').parent('li').attr('id');
        $('.hidden_content').show();//show parent div
        $('#'+product_id+'_details').show();// show relevant child div
    });
    $('body').on('tap click', '.product_overlay', function(){
        $('.product_overlay').hide();//hide relevant child div
         $('.hidden_content').hide();//hide parent div
    });
    
});
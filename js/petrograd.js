window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    // læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);
}

function visProduktListe(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}

function visProdukt(produkt) {
    console.log(produkt);
    // klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    // indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;



    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;


    klon.querySelector(".data_billede").src = "/imgs/small/" + produkt.billede + "-sm.jpg";

    klon.querySelector('button').dataset.id = produkt.id;

    klon.querySelector('button').addEventListener('.click', knapKlikketPå);


    if (produkt.udsolgt == false) {
        // produktet er ikke udsolgt
        // udsolgttekst skal fjernes
        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);


    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }


    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }



    // append klon til .produkt_liste

    console.log("." + produkt.kategori)

    document.querySelector("." + produkt.kategori).appendChild(klon);
}


function knapKlikketPå(oplysningerOmEventet) {

    document.querySelector('#myModalLabel').textContent = "loader...";
    document.querySelector('#myModal .modal-body p').textContent = "loader...";


    var produktId = oplysningerOmEventet.target.dataset.id;

    //send forespørgsel til http://petlatkea.dk/2017/dui/api/product?callback=?&id=
    // med det rigtige id

    $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?&id=" + produktId, visModalIndhold);


}



function visModalIndhold(mereInfo) {

    console.log("mereInfo");

    //info ind i modalboks

    document.querySelector('#myModalLabel').textContent = mereInfo.navn;
    document.querySelector('#myModal .modal-body p').textContent = mereInfo.langbeskrivelse;

    //skift hurtigt mellem info i retterne i modalboks


}

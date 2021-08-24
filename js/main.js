$(document).ready(() => {

    $("#principal-img").fadeIn(3000);
    descubriendoCarrito()
    ocultarCarrito()
    navegandoEnLaPagina()
    documentoProducto()
    trayendoJson()

});
let productoCart = 'productoid';

function navegandoEnLaPagina() {
    $(".ancla").click(function (e) {
        e.preventDefault();
        var codigo = "#" + $(this).data("ancla");
        $("html,body").animate({
            scrollTop: $(codigo).offset().top
        }, 3000);
    });
}


function trayendoJson() {

     

    return $.ajax({
        url: 'https://makeup-api.herokuapp.com/api/v1/products.json',
        type: "GET",
        dataType: "json",
        success: function (data) {

            let dataRender = data;

            $.each(dataRender, function (key, cosmetic) {
                let productoRender = `
       <div class="col 16 m3 s12">
       <div class="card">
       <div class="card-image">
       
       <img src="${cosmetic.image_link}" class="responsive-img z-depth-3 cosmetic-img" onerror="this.onerror=null;this.src='https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Crying-Baby-Page.png';"/>
       <div class="card-content">
       <h5 class="cosmetic-name">${cosmetic.name}</h5>
       <p>${cosmetic.category}</p>
       <div class="card-footer">
       <p class="p-envio">Envio gratis</p>
       <p>Precio: $${cosmetic.price}</p>
       </div>
     </div>
     <div class="card-action">
     <button onClick=(agregarProductoCarrito(${cosmetic.id})) class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">shopping_cart</i></button>
     <a href="./producto.html?id=${cosmetic.id}" class="right">Ver</a>
     </div>
       </div>
       </div>
       </div>
       `         
                $('#cargando').fadeOut(500);
                $('#imagenes').fadeIn(500).append(productoRender);

            });

        },
        error: function (xhr, status) {
            document.innerHTML = "Error de conexion";
        }
    })
}

function infoProducto(idProducto) {
    console.log(idProducto);
    $('.modal').show();
}

function descubriendoCarrito() {
    $('.carrito-bottom').click(function () {
        $('.productos-carrito').show().css('position', 'fixed');
        $('.carrito-bottom').hide()
    })
}

function ocultarCarrito() {
    $('#close-cart').click(function () {
        $('.productos-carrito').css('display', 'none');
        $('.carrito-bottom').show();
    })
}


function agregarProductoCarrito(producto) {

    let arrayProductos = [];
    let localstorageProducto = localStorage.getItem(productoCart)

    if (localstorageProducto === null) {
        arrayProductos.push(producto);
        localStorage.setItem(productoCart, arrayProductos)
    } else {
        let productosId = localStorage.getItem(productoCart)
        if (productosId.length > 0) {
            productosId += ',' + producto;
        } else {
            productosId = producto;
        }
        localStorage.setItem(productoCart, productosId)
    }
    desplegarProductosCarrito()
}

async function desplegarProductosCarrito() {
    const productos = await trayendoJson()

    const localstorageProducto = localStorage.getItem(productoCart)
    const productoSplit = localstorageProducto.split(",")

    const productos_id = Array.from(new Set(productoSplit))

    let html = "";
    $(productos_id).each(id=> {
        $(productos).each(cosmetic=> {
            if (id == cosmetic.id) {
                html += `
                <li class="collection-item avatar">
                        <img src="${cosmetic.image}" alt="${cosmetic.name}" class="circle">
                        <span class="title">Title</span>
                        <p>First Line <br>
                           Second Line
                        </p>
                        <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                      </li>
                `
            }
        })

        

    })
    console.log(html)
}

function documentoProducto() {

}
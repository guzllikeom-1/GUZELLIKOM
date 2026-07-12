// ===============================
// GUZELLIK OM V3 - CART SYSTEM
// ===============================

// تحميل السلة من المتصفح
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// حفظ السلة
// ===============================
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// إضافة منتج للسلة
// ===============================
function addToCart(name, price, image){

    cart.push({
        name: name,
        price: price,
        image: image
    });

    saveCart();
    updateCartCount();
	displayCart();
    showToast("تمت إضافة المنتج 🛍️");
}

// ===============================
// حذف منتج
// ===============================
function removeItem(index){

    cart.splice(index, 1);

    saveCart();
    updateCartCount();
    displayCart();

    showToast("تم حذف المنتج 🗑️");
}

// ===============================
// عرض السلة في صفحة cart
// ===============================
function displayCart(){

    const cartItems = document.getElementById("cart-items");
    const total = document.getElementById("total");
    const checkout = document.getElementById("checkout");

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let totalPrice = 0;
    let message = "🌸 طلب جديد من متجر GUZELLIK OM 🌸%0A%0A";

    cart.forEach((item, index)=>{

        totalPrice += item.price;

        message += `🛍️ ${item.name} - ${item.price.toFixed(3)} ر.ع%0A`;

        cartItems.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>${item.price.toFixed(3)} ر.ع</p>
            </div>

            <button class="remove-btn" onclick="removeItem(${index})">
                حذف
            </button>
        </div>
        `;
    });

    message += "%0A━━━━━━━━━━━━━━━━━━%0A";
    message += `💰 مجموع الطلب: ${totalPrice.toFixed(3)} ر.ع%0A`;
    message += "━━━━━━━━━━━━━━━━━━%0A%0A";
    message += "🏦 بيانات التحويل البنكي:%0A";
    message += "👤 الاسم: FADOA %0A";
    message += "📱 رقم التحويل: 91102129%0A%0A";
    message += "📸 بعد التحويل يرجى إرسال إيصال التحويل لإكمال الطلب. شكرًا لتسوقكم من GUZELLIK OM 🌸";

    if(total){
        total.innerText = totalPrice.toFixed(3) + " ر.ع";
    }

    if(checkout){
        checkout.href = "https://wa.me/96891102129?text=" + message;
    }
}

// ===============================
// تحديث عداد السلة
// ===============================
function updateCartCount(){

    const count = document.getElementById("cart-count");

    if(count){
        count.innerText = cart.length;
    }
}

// ===============================
// Toast Notification
// ===============================
function showToast(message){

    let toast = document.getElementById("toast");

    if(!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    }, 2000);
}

// ===============================
// تشغيل تلقائي عند فتح أي صفحة
// ===============================
updateCartCount();
displayCart();

// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector("#navLinks");

if(menuBtn && navLinks){

    menuBtn.addEventListener("click", function(){

        navLinks.classList.toggle("active");

    });

}
// ===============================
// Contact WhatsApp
// ===============================

function sendWhatsApp(){

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    if(!name || !phone || !message){
        return;
    }

    if(name.value.trim()==="" || phone.value.trim()==="" || message.value.trim()===""){
        alert("يرجى تعبئة جميع الحقول");
        return;
    }

    const text =
`🌸 رسالة جديدة من موقع GUZELLIK OM 🌸

👤 الاسم: ${name.value}

📞 رقم الهاتف: ${phone.value}

💬 الرسالة:
${message.value}`;

    window.open(
        "https://wa.me/96891102129?text=" + encodeURIComponent(text),
        "_blank"
    );
}

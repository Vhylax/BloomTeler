let cart=[],history=[];
let products=[
 ];

let facts=["Es teler khas Indonesia 🍧","Alpukat bikin kenyang lama","Minuman dingin bantu mood naik","Kelapa muda bantu hidrasi"];
let i=0;
setInterval(()=>{funfact.innerText="💡 Fun Fact: "+facts[i++%facts.length];},3000);

function toggleMenu(){menu.style.display=menu.style.display=="block"?"none":"block";}
function show(id){document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");menu.style.display="none";}

function add(n,h,e){
  let item = cart.find(i => i.n === n);
  if(item){
    item.q++;
  }else{
    cart.push({n, h, q:1});
  }
  render();
  showNotification(e, n);
}
function showNotification(image, name){
  document.getElementById("notif-emoji").innerHTML = `<img src="${image}" alt="Produk" style="width:30px;height:30px;border-radius:5px;">`;
  document.getElementById("notif-text").innerText = ` ${name} ditambahkan ke keranjang!`;
  let notif = document.getElementById("notification");
  notif.style.display = "block";
  setTimeout(() => {
    notif.style.display = "none";
  }, 3000);
}
function render(){
 let t=0;
 document.getElementById("cart").innerHTML="";
 cart.forEach(i=>{
   let itemTotal = i.h * i.q;
   t += itemTotal;
   document.getElementById("cart").innerHTML+=`<div class="item"><span>${i.n} x ${i.q}</span><span>${itemTotal}</span></div>`;
 });
 total.innerText=t;
 document.getElementById("cart-count").innerText = cart.reduce((sum, i) => sum + i.q, 0);
}

function showKonfirmasi(){
 if(!cart.length)return alert("Keranjang kosong");
 document.getElementById("modal-konfirmasi").style.display = "block";
 // Add listeners
 document.getElementById("nama").addEventListener("input", checkForm);
 document.getElementById("telepon").addEventListener("input", checkForm);
 document.getElementById("metode").addEventListener("change", checkForm);
}

function closeModal(){
 document.getElementById("modal-konfirmasi").style.display = "none";
}

function updateMetode(){
 // Jika perlu update detail metode
 let metode = document.getElementById("metode").value;
 // Misalnya, untuk bank, tampilkan rekening, tapi sederhana saja.
 checkForm();
}

function checkForm(){
 let nama = document.getElementById("nama").value;
 let telepon = document.getElementById("telepon").value;
 let metode = document.getElementById("metode").value;
 let btn = document.getElementById("btn-konfirmasi");
 if(nama && telepon && metode){
   btn.disabled = false;
 }else{
   btn.disabled = true;
 }
}

function konfirmasiPenuh(){
 let nama = document.getElementById("nama").value;
 let telepon = document.getElementById("telepon").value;
 let metode = document.getElementById("metode").value;
 let pesanan = cart.map(i=> `${i.n} x ${i.q}`).join(", ");
 let total = document.getElementById("total").innerText;
 let message = `Halo, saya ${nama}, no HP ${telepon}. Pesanan: ${pesanan}. Total: Rp${total}. Metode: ${metode}.`;
 let waLink = `https://wa.me/628811110288?text=${encodeURIComponent(message)}`;
 window.open(waLink, '_blank');
 // Simpan ke history
 history.push(pesanan);
 cart=[];render();
 closeModal();
 let htm="";
 history.forEach((h)=>{htm+=`<li>Pesanan: ${h}</li>`});
 document.getElementById("history").innerHTML=htm;
 alert("Pesanan dikirim via WhatsApp!");
}

function showModalHapus(){
  document.getElementById("modal-hapus").style.display = "block";
}

function closeModalHapus(){
  document.getElementById("modal-hapus").style.display = "none";
}

function hapusRiwayat(){
  history = [];
  document.getElementById("history").innerHTML = "";
  closeModalHapus();
}

// RENDER PRODUCTS
const prodContainer = document.getElementById("products");
products.forEach(p=>{
  prodContainer.innerHTML+=`
    <div class="card ${p.color}">
      <img src="${p.image}" alt="${p.name}" style="width:50px;height:50px;border-radius:10px;">
      <h4>${p.name}</h4>
      <p>${p.name} delicious & creamy</p>
      <div class="price">Rp${p.price}</div>
      <div class="rating">${p.rating}</div>
      <button onclick="add('${p.name}',${p.price},'${p.image}')">Tambah</button>
    </div>`;
});

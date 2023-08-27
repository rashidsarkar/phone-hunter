const loadPhone = async (phoneName) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phoneName}`
  );
  const data = await res.json();
  const phones = data.data;

  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone_container");
  // console.log(phones.length);
  //Display Show ALL BTN
  const showAllContainer = document.getElementById("show_all");
  if (phones.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else if (phones.length < 12) {
    showAllContainer.classList.add("hidden");
  }
  // display only fast 10 phones
  phones = phones.slice(0, 12);
  //clrear phone
  phoneContainer.textContent = "";
  // console.log(phone);
  phones.forEach((phone) => {
    console.log(phone);
    //1 creat a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
};
//handel btn
const handleSarch = () => {
  const sarcheFild = document.getElementById("sarche_fild");
  const sarchText = sarcheFild.value;
  // console.log(sarchText);
  loadPhone(sarchText);
};
const handleSarch2 = () => {
  const searchFild = document.getElementById("sarche_fild2");
  const sarchText = searchFild.value;
  loadPhone(sarchText);
};
// loadPhone();

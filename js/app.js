const loadPhone = async (phoneName = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phoneName}`
  );
  const data = await res.json();
  const phones = data.data;

  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone_container");
  // console.log(phones.length);
  //Display Show ALL BTN
  const showAllContainer = document.getElementById("show_all");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // display only fast 10 phones
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  //clrear phone
  phoneContainer.textContent = "";
  // console.log(phone);
  phones.forEach((phone) => {
    // console.log(phone);
    //1 creat a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  //hide loading spener
  toggleLoading(false);
};
//handel btn
const handleSarch = (isShowAll) => {
  toggleLoading(true);

  const sarcheFild = document.getElementById("sarche_fild");
  const sarchText = sarcheFild.value;
  // console.log(sarchText);
  loadPhone(sarchText, isShowAll);
};
// sarch recap

const toggleLoading = (isLoading) => {
  const loadingSpiner = document.getElementById("spiner");

  if (isLoading) {
    loadingSpiner.classList.remove("hidden");
  } else {
    loadingSpiner.classList.add("hidden");
  }
};
//handel show all
const handelShowAll = () => {
  handleSarch(true);
};
const handelShowDetails = async (id) => {
  // Load Data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
  // display
};
const showPhoneDetails = (phone) => {
  show_details.showModal();
  const showDetailPhoneName = document.getElementById("phone_name");
  showDetailPhoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById("showDetailContainer");
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="" />
  <h3>Brand: ${phone?.brand}</h3>
  <p><span>Storage : </span>${phone.mainFeatures?.storage}</p>
  <p>DisplaySize: ${phone.mainFeatures.displaySize}</p>
  <p>GPS : ${phone.others?.GPS || "NO GPS"}</p>
  `;

  console.log(phone);
};
loadPhone();

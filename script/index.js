
const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // console.log('is nizam', isShowAll);
  if(!isShowAll){
    phones = phones.slice(0, 10);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 p-3 shadow-xl`;
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
             <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
               <button onclick="hendleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
         </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });

  toggeleLoadingSpinner(false);
};

const hendleShowDetail = async(id) => {
  // console.log('ok', id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data;

  showPhoneDetail(phone)
}



const showPhoneDetail = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img class="ml-40 bordrer rounded-2xl" src="${phone.image}" alt="">
  <p class="font-bold text-xl mt-2 text-white"><span>storage:</span>${phone?.mainFeatures?.storage}</p>
  <h3 class="font-bold text-xl mt-2 text-white">Display Size : ${phone?.mainFeatures?.displaySize}</h3>
  <h3 class="font-bold text-xl mt-2 text-white">Chipset : ${phone?.mainFeatures?.chipSet}</h3>
  <h3 class="font-bold text-xl mt-2 text-white">Memory : ${phone?.mainFeatures?.memory}</h3>
  <h3 class="font-bold text-xl mt-2 text-white">Slug : ${phone?.slug}</h3>
  <h3 class="font-bold text-xl mt-2 text-white">Release data : ${phone?.releaseDate}</h3>
  <h3 class="font-bold text-xl mt-2 text-white">brand : ${phone?.brand}</h3>
  <h3 class="font-bold text-xl mt-2 text-white">GPS : ${phone?.others?.GPS || 'No GPS'}</h3>

  `;
  show_details_modal.showModal()
}



const handelScarch = (isShowAll) => {
  toggeleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

const toggeleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const handelShowAll = () => {
    handelScarch(true);
}

// loadPhone();

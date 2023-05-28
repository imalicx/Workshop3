function getRoomRate(checkInDate, roomType) {

  // room rates for each room type
  const roomRates = {
    Queen: 100,
    King: 150,
    '2-Bedroom Suite': 250
  };


  const baseRate = roomRates[roomType];
  const date = new Date(checkInDate);
  const dayOfWeek = date.getDay(); 

  return baseRate;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const checkInDate = document.getElementById('checkInDate').value;
  const numNights = parseInt(document.getElementById('numNights').value);
  const roomType = document.querySelector('input[name="roomType"]:checked').value;
  const numAdults = parseInt(document.getElementById('numAdults').value);
  const numChildren = parseInt(document.getElementById('numChildren').value);
  const discount = document.querySelector('input[name="discount"]:checked').value;

  const messageDiv = document.getElementById('messageDiv');
  const costDiv = document.getElementById('costDiv');

  messageDiv.innerText = '';
  costDiv.innerHTML = '';

  
  const maxOccupancy = roomType === 'Queen' ? 5 : (roomType === 'King' ? 2 : 6);
  const totalGuests = numAdults + numChildren;
  if (totalGuests > maxOccupancy) {
    messageDiv.innerText = 'The room you selected will not hold your party.';
    return;
  }

  //  the room rate
  const roomRate = getRoomRate(checkInDate, roomType);

  //  the discounted room rate
  let discountedRoomRate = roomRate;
  if (discount === 'aaa') {
    discountedRoomRate -= roomRate * 0.1; // 10% discount for zenior
  } else if (discount === 'military') {
    discountedRoomRate -= roomRate * 0.2; // 20% discount for military
  }

  // tax and cost
  const taxRate = 0.12;
  const tax = (discountedRoomRate * numNights) * taxRate;
  const totalCost = (discountedRoomRate * numNights) + tax;

  // confirmation number
  const confirmationNumber = `${name.substring(0, 3).toUpperCase()}-${checkInDate.replace(/-/g, '').substring(2)}-${numNights}:${numAdults}:${numChildren}`;

  // display the cost
  costDiv.innerHTML = `
    <p>Original Room Cost: $${roomRate.toFixed(2)}</p>
    <p>Discount: ${discount === 'none' ? 'None' : `${discount} (${discount === 'aaa' ? '10' : '20'}%)`}</p>
    <p>Discounted Room Cost: $${discountedRoomRate.toFixed(2)}</p>
    <p>Tax: $${tax.toFixed(2)}</p>
    <p>Total Cost of Stay: $${totalCost.toFixed(2)}</p>
    <p>Confirmation Number: ${confirmationNumber}</p>
  `;
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', handleFormReset);
}

function handleFormReset() {
    const form = document.getElementById('overnightForm');
    form.reset();
  
    const messageDiv = document.getElementById('messageDiv');
    const costDiv = document.getElementById('costDiv');
  
    messageDiv.innerText = '';
    costDiv.innerHTML = '';
  }

document.getElementById('overnightForm').addEventListener('submit', handleFormSubmit);

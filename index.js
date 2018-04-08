'use strict';

const STORE = {
  items : [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  toggled : false,
};

//let currentDisplayItems = STORE.items;

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function generateItemElement(item, itemIndex) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}" '>
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <form id="js-shopping-edit-form">
<label for="shopping-list-edit">Edit item</label>
<input type="text" name="shopping-list-edit" class="js-shopping-list-edit" placeholder="e.g., grapes" required>
<button type="submit" class='edit'>Edit</button>
</form> 
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}

//listOfItems needs to be an array
function renderShoppingList() {
  (!STORE.toggled) ? $('.js-shopping-list').html(generateShoppingItemsString(STORE.items)) : $('.js-shopping-list').html(generateShoppingItemsString(STORE.items.filter(item => item['checked'] === false)));
  
}


//Handles the new items added
function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    let newItemName = $('.js-shopping-list-entry').val();
    addItemToShoppingList(newItemName);
    $('.js-shopping-list-entry').val('');
    renderShoppingList();
  });
}

function addItemToShoppingList(itemName) {
  STORE.items.push({name: itemName, checked: false});
  
}

// Handles the check button
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    let itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    // currentDisplayItems = STORE.items;
    //console.log(itemIndex);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


//Handles the delete button
function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click','.js-item-delete',function(event){
    let itemIndex = getItemIndexFromElement(event.currentTarget);
    STORE.items.splice(itemIndex,1);
    $(this).closest('li').remove();
    renderShoppingList();
  });
}

//Handles the search list
function searchedForItems(){
  $('#js-shopping-search-form').submit(function(event) {
    event.preventDefault();
    let searchTerm = $('.js-shopping-list-search').val();
    let newArr = STORE.items.filter(item => item['name'] === searchTerm);
    let shoppingListItemsString = generateShoppingItemsString(newArr);
    $('.js-shopping-list').html(shoppingListItemsString);
    $('.js-shopping-list-search').val('');
  });
} 


//Toggling between checked and unchecked items
function changeToggleValue(){
  (!STORE.toggled) ? STORE.toggled = true : STORE.toggled = false;
}

function toggleCheckedItems (){
  $('.toggleButton').on('click', event => {
    changeToggleValue();
    renderShoppingList();
    });
}


//finding the index of an item in the store
function findStoreIndex(currentItem){
  // console.log(STORE.items.find(function(){
  //   return STORE.items.findIndex(currentItem);}));
  //console.log(STORE.items[0].name);
  var elementPosition = STORE.items.map(function(item) {return item.name; }).indexOf(currentItem);
  return elementPosition;
  //var objectFound = STORE.items[elementPos];
  //console.log(elementPos);
  //console.log(objectFound);
}

//looking for item name and change
function thisItemName (){
  let itemName = $(this)
    .closest('.js-item-index-element')
    .attr('data-name');
  console.log(itemName);
}

// //editing a  name and rerendering




function editItem () {
  $('.shopping-list').on('click', '.edit',function(event) {
    event.preventDefault();
    let newName = $('.js-shopping-list-edit').val();
    console.log(newName);
    // const itemIndex = getItemIndexFromElement(event.currentTarget);
    // //console.log($(this).attr('data-item-index'));
    // //console.log($(this).attr('data-name'));
   findStoreIndex($(this).attr('data-name'));
    // let indexOfItem = findStoreIndex($(this).attr('data-name'));
    // //console.log(indexOfItem);
    // //thisItemName();
    // //console.log(STORE.items[indexOfItem].name);
    // STORE.items[indexOfItem]['name'] = newName;
    // $('.js-shopping-list-edit').val('');
    // console.log(itemIndex);
     renderShoppingList();
  });

 }





// ----this was part of rendering
// else {
//     let newArr = searchForUnchecked();
//     let string = generateShoppingItemsString(newArr);
//     $('.js-shopping-list').html(string);
//   }
// }

// function renderUnchecked (arr){
//   let shoppingListItemsString = generateShoppingItemsString(arr);
//   $('.js-shopping-list').html(shoppingListItemsString);
// }

// function searchForUnchecked(){
//   return STORE.items.filter(item => item['checked'] === false);
// }











// // this function will be our callback when the page loads. it's responsible for
// // initially rendering the shopping list, and activating our individual functions
// // that handle new item submission and user clicks on the "check" and "delete" buttons
// // for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  toggleCheckedItems();
  searchedForItems();
  editItem();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);


//  Edit item
//  <input type="text" name="shopping-list-edit" id="js-shopping-list-edit" placeholder="e.g., grapes">
//  <button type="submit" class= 'edit' data-item-index='${itemIndex}' data-name='${item.name}'>Edit</button>
        

// this was for editing an item-------------ignore for now
{/* <form id="js-shopping-edit-form">
<label for="shopping-list-edit">Edit item</label>
<input type="text" name="shopping-list-edit" class="js-shopping-list-edit" placeholder="e.g., grapes" required>
<button type="submit" class='edit'>Edit</button>
</form> */}
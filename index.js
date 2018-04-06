'use strict';

const STORE = {
  items : [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  checked : false,
};


//editing a store name and rerendering







function toggleCheckedItems (){
  $('.toggleButton').on('click', event => {
    if (!STORE.checked){
      STORE.checked = true;
    } else {
      STORE.checked = false;
    }
    renderShoppingList();
  });
}


function searchedForItems(){
  
  $('#js-shopping-search-form').submit(function(event) {
    event.preventDefault();
      
    let searchTerm = $('.js-shopping-list-search').val();
    $('.js-shopping-list-search').val('');
     let newArr = STORE.items.filter(item => item['name'] === searchTerm);
    //renderShoppingList();
    let string = generateShoppingItemsString(newArr);
    renderSearchedForItems(string);
  });
}


function renderSearchedForItems(data) {
 
  $('.js-shopping-list').html(data);
}




























function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);
  if(!STORE.checked){
  // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
  } else {
    let newArr = searchForUnchecked();
    let string = generateShoppingItemsString(newArr);
    $('.js-shopping-list').html(string);
  }
}
function renderUnchecked (arr){
  let shoppingListItemsString = generateShoppingItemsString(arr);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function searchForUnchecked(){
  return STORE.items.filter(item => item['checked'] === false);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  $('.js-shopping-list').on('click','.js-item-delete',function(event){
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    delete STORE[itemIndex];
    // STORE.splice(itemIndex,1);
    // $(this).closest("li").remove();
    console.log(STORE);
    renderShoppingList();
  });
  
  
  console.log('`handleDeleteItemClicked` ran');
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  toggleCheckedItems();
  searchedForItems();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
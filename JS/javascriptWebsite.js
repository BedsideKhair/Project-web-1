//alert("Hello");

//-----------------------------------------------------
//CURTAIN MENU
function openNav() {
	document.getElementById("curtain-nav").style.width = "50%";	
		
}

function closeNav() {
	document.getElementById("curtain-nav").style.width = "0%";			
}		

//Data: assume we have a list of top 5 product
let topProducts = [{id: 0, title: "HP 15.6 AMD Athlon 3150u 8GB RAM 256GB SSD Laptop", image_url: "MEDIA/product0.jpg", description: "Stay connected to what matters most with long-lasting battery life and a thin micro-edge bezel design. Built to keep you productive and entertained from anywhere.", cost: "Cost: $879"},
				 {id: 1, title: "Sandisk Cruzer Glide USB Flashdrive - 32GB", image_url: "MEDIA/product1.jpg", description: "Secure and reliable portable storage with USB 3.0 performance and high capacities make it ideal for all your photos, videos, music, and other files.", cost: "Cost: $19"},
				 {id: 2, title: "Canon Pixma G3620 Megatank Printer", image_url: "MEDIA/product2.jpg", description: "The Canon PIXMA G3620 MegaTank prints at speeds of approximately 9.1 ipm in black and white, and 5 ipm in colour, enabling you to print multiple pages. Ideal for your work printing needs.", cost: "Cost: $299"},
			     {id: 3, title: "WD My Passport 1TB USB 3.0 External HDD - White", image_url: "MEDIA/product3.jpg", description: "Every journey needs a passport. The My Passport drive is trusted, portable storage that gives you the confidence and freedom to drive forward in life. With a new, stylish design that fits in the palm of your hand, there's space to store, organize, and share your photos, videos, music, and documents. Perfectly paired with WD Backup software and password protection, the My Passport drive helps keep your digital life's contents safe.", cost: "Cost: $69"},
			     {id: 4, title: "Apple iPad Pro 11 M1 128GB WiFi - Silver", image_url: "MEDIA/product4.jpg", description: "iPad Pro features the powerful Apple M1 chip with next-level performance and all-day battery life. The Liquid Retina display on the 11-inch iPad Pro is not only gorgeous, but incredibly portable. Wi-Fi 6 for incredibly fast download speeds.", cost: "Cost: $1329"},
				];

//-----------------------------------------------------------------------------------------------------
//Slideshows
//Manual Slideshows
let manualIndex = 0;
function nextProduct() {
	//increase index by 1 if index <= length of topproducts array.
	//if index == 4, move back to first product: index = 0
	if (manualIndex < topProducts.length - 1) {
		manualIndex++;
	} else {
		manualIndex = 0;
	}
		
	//extract title, image url, description and display on HTML elements
	document.getElementById("manual-slide-title").innerHTML = topProducts[manualIndex].title;
	document.getElementById("manual-slide-description").innerHTML = topProducts[manualIndex].description;
	document.getElementById("manual-slide-cost").innerHTML = topProducts[manualIndex].cost;
	document.getElementById("manual-slide-image").src = topProducts[manualIndex].image_url;
	
		}

function previousProduct() {
	//Decrease Index if Index is not 0
	if (manualIndex > 0 ) {
		manualIndex--;
	} else {
		manualIndex = topProducts.length = 1;
	}
	//Extract title, url and display them on HTML elements
	document.getElementById("manual-slide-title").innerHTML = topProducts[manualIndex].title;
	document.getElementById("manual-slide-description").innerHTML = topProducts[manualIndex].description;
	document.getElementById("manual-slide-cost").innerHTML = topProducts[manualIndex].cost;
	document.getElementById("manual-slide-image").src = topProducts[manualIndex].image_url;
}

//automantic slideshow
let autoIndex = 0;
function autoSlideShow() {
	//change autoIndex
	if (autoIndex < topProducts.length - 1) {
		autoIndex++;
	} else {
		autoIndex = 0;
	}
	
	//Extract title, url and display them on HTML elements
	document.getElementById("auto-slide-title").innerHTML = topProducts[autoIndex].title;
	document.getElementById("auto-slide-image").src = topProducts[autoIndex].image_url;
	
	//wait 2 seconds to display next product
	setTimeout(autoSlideShow, 1000);
}

//Execute autoSlideShow() functiobn when website is loaded
autoSlideShow();

//----------------
//Web Customization
//color background
function changeColor(event){
    var color = event.value;
document.getElementsByTagName('BODY')[0].style.backgroundColor=color;
}

function myFunction(selectTag) {
  var listValue = selectTag.options[selectTag.selectedIndex].text;
  document.getElementById("size").style.fontSize = listValue;
}

//------------------------------------------------------------------------------------------------------
//Create a Product class 
class Product {
	//Properties (props) & Constructor
	constructor(id, title, image_url,description,cost) {
		this.id = id;
		this.title = title; //"this" = this object property
		this.image_url = image_url;//"this" = this object property
		this.description = description; //"this" = this object property
		this.cost = cost; //"this" = this object property
	}
	//Methods: render the HTML content of the Product to webpage UI
	render() {
		let content = `<div class="col-12 col-md-4 p-2">
						<div class="border border-primary bg-secondary h-100">
							<h3 class="text-center">${this.title}</h3>
							<p class="text-center">${this.cost}</p>
							<img src=${this.image_url} class="image-style" width ="200" height="200">
							<p class="text-center">${this.description}</p>
							<div class="text-center">
								<button class="btn btn-warning" onclick="addToCart(${this.id})">ADD TO CART</button>
							</div>				
						</div>
					   </div>
					   `;
		//Return the content
		return content;
	}
}

//Create a product object & Display it on webpage UI
let aProduct = new Product(topProducts[0].id, topProducts[0].title, topProducts[0].image_url, topProducts[0].description, topProducts[0].cost);
//console.log(document.getElementById("product-list"));
document.getElementById("product-list").innerHTML = aProduct.render();

//------------------------------------------
//Shopping 
//Create a list of product objects & display on webpage UI
let ProductObjects = [];
let listOfProductObjectsContent = "";
for (let i = 0; i < topProducts.length ; i++) {
	let product = new Product(topProducts[i].id, topProducts[i].title, topProducts[i].image_url, topProducts[i].description, topProducts[i].cost);
	ProductObjects.push(Product);//Append the product to the list of product objects
	listOfProductObjectsContent += product.render();//build up the html render
}
//Display a list of product objects on webpage UI
document.getElementById("product-list").innerHTML = listOfProductObjectsContent;

//Filter feature: https://www.w3schools.com/jsref/jsref_filter.asp
function displayFilteredProducts() {
	//Get keyword entered by user
	let keyword = document.getElementById("searchInput").value.toLowerCase();
	//Call to execute the filter method.
	let filteredObjects = ProductObjects.filter(containKeyword);
	//Display the filtered Products
	let listOfFilteredProductContent = "";
	for (let i = 0; i < filteredObjects.length ; i++) {
		listOfFilteredProductContent += filteredObjects[i].render();//build up the html render
	}
	//Display a list of Product objects on webpage UI
	document.getElementById("Product-list").innerHTML = listOfFilteredProductContent;

	//Filter function
	function containKeyword(Product) {
		if (Product.title.toLowerCase().includes(keyword)) {
		return true;
		} else {
		return false;
		}
	}
}

//Add to Shopping cart
function addToCart(id) {
	//Create a new HTML node/element <p> to display this newly added item
	let node = document.createElement("p");
	//Set styles to new node
	//node.className = 'class-name';
	node.style.color = 'blue';
	node.style.backgroundColor = 'yellow';
	//Set content for new node
	let nodeContent = document.createTextNode(ProductObjects[id].title + ": ");
	//Append the content (nodeContent) to the new node
	node.appendChild(nodeContent);
	//Append the above child HTML node to the parent node "shopping-cart"
	document.getElementById("shopping-cart").appendChild(node);
}

//update shopping cart with remove button
let itemNumber = 0;
function addToCart(id) {
	//
	itemNumber++;//used for creating unique id for item added into shopping cart
	//
	let currentShoppingCart = document.getElementById("shopping-cart").innerHTML;
	let newAddedProduct = `<div id="${itemNumber}">
							<label style='color: red; background: yellow;'>${ProductObjects[id].title}.${ProductObjects[id].description}.${ProductObjects[id].cost}</label>
							<input type="button" value="REMOVE" onclick="removeItem(${itemNumber})">
						</div>`;
	//update shopping cart
	
	document.getElementById("shopping-cart").innerHTML = currentShoppingCart + newAddedProduct;
}

//Remove function
function removeItem(itemID) {
	document.getElementById(itemID).remove();
}

//------------------------------------------------------------------------------------------------------
//ADD NEW COMMENT
//Data: Assume we have a list of existing comments stored in an array "allComments"
let allComments = [{name: "Ian", comment: "Recommended, good one"},
{name: "Aman", comment: "I don't like this product"},
{name: "John", comment: "Love it"},
{name: "Joseph", comment: "I thought Nokia has the worst products but this trash of a Laptop takes the cake"},
];
//----------
//Load all existing comments and display them on HTML
function loadComments() {
//Loop through all comments in the array "allComments"
for (var i=0; i < allComments.length; i++) {
let name = allComments[i].name;
let comment = allComments[i].comment;
//Create a new HTML node/element <P> to display this comment
let node = document.createElement("P");
let textnode = document.createTextNode(name + ": " + comment);
node.appendChild(textnode);//Append the content (created TextNode) to the HTML Node (child)
let parrent_node = document.getElementById("comment-list");//Get the id of parent node "commentlist"
parrent_node.appendChild(node);//Append the above child HTML node to the parent node
}
}

//Call to run this loadComments function when the webpage is loaded.
loadComments();
//----------
//Add a new comment
function addComment() {
//Get entered value/data by user
let enteredCommentName = document.getElementById("comment_name").value;
let enteredCommentText = document.getElementById("comment_text").value;
//Add this new comment to the array
allComments.push({name: enteredCommentName, comment: enteredCommentText});
alert("Thank you for your comment!");
//Display this new comment on HTML page
//Create a new child HTML node/element as "<p>" (paragraph) (as a child node)
let node = document.createElement("P");
//Create a new TextNode
let textnode = document.createTextNode(enteredCommentName + ": " + enteredCommentText);
//Append the content (created TextNode) to the HTML Node (child)
node.appendChild(textnode);
//Get the id of parent node "comment-list"
let parrent_node = document.getElementById("comment-list");
//Append the above child HTML node to the parent node
parrent_node.appendChild(node);
//Clear comment box
document.getElementById("comment_name").value = "";
document.getElementById("comment_text").value = "";
}

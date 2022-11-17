document.addEventListener('deviceready', loadContacts, false);

function loadContacts() {
	let options      = new ContactFindOptions();
	options.filter   = "ESP";
	options.multiple = true;
	
	let fields = ['id'];

	navigator.contacts.find(fields, showContacts, onError, options);

}

function showContacts(contacts) {
	let contactsHTML = '';
	for (let i=0; i < contacts.length; i++ ){
		contactsHTML += `
        <li>
            <a href="#" onClick="showContact(${contacts[i].id})">
              <img src="img/1__.png" alt="avatar-contact">
              <h2>${contacts[i].name.formatted}</h2>
              <p>${contacts[i].phoneNumbers[0].value}</p>  
            </a>
        </li>
		`
	}
	contactList.innerHTML = contactsHTML;
	$(contactList).listview('refresh');
}
function handleContact(contacts){
	let contactList = $('#contactList');

	contactList.html('');
	console.log(`${contacts.length} contact trouvé(s)`);
	for (let i = 0, items = null , contactInfo = null; i < contacts.length; i++){
		contactInfo = `
		<a href=""> 

		</a>`
	}
}

function showContact(id){

    function onSuccess(contact){
        let contacter = contact[0];
     	let   phone = [];
        for (let i = 0; i < contacter.phoneNumbers.length; i++) {
            phone[i] = contacter.phoneNumbers[i].value;
            
        }
        let detail =` <li>
    <a href=#editpage onclick="editContact(${contacter.id})" data-role="button" data-icon="edit" >editer</a>
        <p>id :${contacter.id}</p>
        <p>name :${contacter.name.formatted} </p>
        <p>numéros :${phone}</p>
    </li>`;
    showContact.innerHTML=detail;
    }
    function onError(){
        alert('echec');
    }
    var options      = new ContactFindOptions();
    options.filter   = id;
    options.hasPhoneNumber = true;
    var fields       = ["id"];
    navigator.contacts.find(fields, onSuccess, onError, options);
    
       
        
}


function deleteContact(id){

    function onSuccess(contacts) {
        let contact = contacts[0];
        contact.remove(contactRemoveSuccess, contactRemoveError);

        function contactRemoveSuccess(contact) {
           alert("Contact Deleted");
           loadContacts();
        }
    
        function contactRemoveError(message) {
           alert('Failed because: ' + message);
        }
        $(contactsList).listview('refresh');
    };
    
    function onError(contactError) {
        alert('echec');
    };
    
    let options      = new ContactFindOptions();
    options.filter   = id;
    options.hasPhoneNumber = true;
    let fields       = ["id"];
    navigator.contacts.find(fields, onSuccess, onError, options);

   
}

function createContact(){
    function onSuccess(contact) {
        alert("Save Success"+tel.value);
        loadContacts();
        $(contactsList).listview('refresh');

    };
    
    function onError(contactError) {
        alert("Error = " + contactError);
    };
    
    let contact = navigator.contacts.create();
    contact.displayName = prenom.value;
    contact.nickname = nom.value;  
    let phoneNumber=[];
    phoneNumber[0]= tel.value;   
    phoneNumber[0] = new ContactField('mobile', tel.value, true);
    contact.phoneNumbers =  phoneNumber;     
    
    contact.save(onSuccess,onError);
}

function editContact(id){

    function onSuccess(contact) {

        let contacte = contact[0];
       
        
        let contactModify = contacte.clone();
            
        contacte.remove(function(){
            let displayName = prenom.value;
            let name = nom.value;
            let phoneNumber = [];
            phoneNumber[0] = new ContactField('mobile',tel.value,'true');
            contactModify.displayName = displayName;
            contactModify.name = name;
            contactModify.phoneNumbers = phoneNumber;
            contactModify.save(function(res){
                
                loadContacts();
                $(contactsList).listview('refresh');
        },function(error){
                alert("modification échouer")
          });
        },function(removetError)
	      { 
	        alert("not removed");
	      });
        
    };

    let options      = new ContactFindOptions();
    options.filter   = id;
    options.hasPhoneNumber = true;
    let fields       = ["id"];
    navigator.contacts.find(fields, onSuccess, onErro, options);
}

function onError(error){
	console.log(error);
}
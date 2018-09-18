function form_validation() {
	var id=$("input[name='id']").val();
	var f_name = document.forms['MyForm']['f-name'].value;
	var l_name = document.forms['MyForm']['l-name'].value;
	var email = document.forms['MyForm']['email'].value;
	var phone = document.forms['MyForm']['phone'].value;
	var status = document.forms['MyForm']['status'].value;
	var contacts = JSON.parse(localStorage.getItem('contacts'));
	if(id==0)
	{
		
		// console.log(l_name);
		if( f_name == "" ) {
			alert("Please Enter First Name");
			return false;
		}
		if( l_name == "" ) {
			alert("Please Enter Last Name");
			return false;
		}
		if( email == "" ) {
			alert("Please Enter Email");
			return false;
		}

		if( status == "" ) {
			alert("Please Select User Status");
			return false;
		}

		
		var contact={
			id:GenerateId(),
			fname:f_name,
			lname:l_name,
			email:email,
			phone:phone,
			status:status
		};

		if(contacts)
		{
			contacts.push(contact);
		}
		else
		{
			contacts=[];
			contacts.push(contact);	
		}

		localStorage.setItem('contacts', JSON.stringify(contacts));  
	}
	else
	{
		//var contact=null;
		for (var i = 0; i < contacts.length; i++) {
		    var obj = contacts[i];

		    if (id==obj.id) {
			    obj.fname=f_name;
				obj.lname=l_name;
				obj.email=email;
				obj.phone=phone;
				obj.status=status;
		    }
		}
		localStorage.setItem('contacts', JSON.stringify(contacts));  
		$(".lblSuccess").removeClass("hide");
		return false;
	}
}

function GenerateId() {
    var x = Math.floor((Math.random() * 1000) + 1);
    return x;
}

function loadrecords()
{
	var contacts = JSON.parse(localStorage.getItem('contacts'));
	var rows="";
	$(contacts).each(function(){
		var c=this;
		var row="<tr>";
		row+="<td>"+c.id+"</td>";
		row+="<td>"+c.fname+"</td>";
		row+="<td>"+c.lname+"</td>";
		row+="<td>"+c.email+"</td>";
		row+="<td>"+c.phone+"</td>";
		row+="<td>"+c.status+"</td>";
		row+="<td><a href='javascript:DeleteContact("+c.id+")'>Delete</a>&nbsp;|&nbsp;<a href='index.html?id="+c.id+"'>Edit</a></td>";
		rows+=row;
	});

	$("#tblContacts tbody").html(rows);
}

function DeleteContact(id)
{
	if(confirm("Are you sure?"))
	{
	var contacts = JSON.parse(localStorage.getItem('contacts'));	
	//var id=$(_this).attr("data-id");
	for (var i = 0; i < contacts.length; i++) {
    var obj = contacts[i];

    if (id==obj.id) {
        contacts.splice(i, 1);
        i--;
    }
	}
    localStorage.setItem('contacts', JSON.stringify(contacts));  
    window.location.reload(true);
}
}

function CheckDisplayType()
{
	if(window.location.href.indexOf("id=")!=-1)
	{
		var id=getQueryStringValue("id");
		var contacts = JSON.parse(localStorage.getItem('contacts'));	 
		var contact=null;
		for (var i = 0; i < contacts.length; i++) {
		    var obj = contacts[i];

		    if (id==obj.id) {
		        contact=obj;
			        break;
		    }
		}

		$("input[name='f-name']").val(contact.fname);
		$("input[name='l-name']").val(contact.lname);
		$("input[name='email']").val(contact.email);
		$("input[name='phone']").val(contact.phone);
		$("input[name='status'][value='"+contact.status+"']").prop("checked",true);
		$("input[name='id']").val(contact.id);
	}
}

function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
} 
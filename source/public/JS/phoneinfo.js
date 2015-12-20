
		function showIt(data){
			console.log(data);
			document.getElementById('phonedisplay').innerHTML = data;

		} 
			 var data = <%- JSON.stringify(StudentsDataOut) %>

			 console.log(data)

			 var myString = "";
			 for (var i = 0; i < data.length; i++) {
					var company = data[i].company;
					var phoneid = data[i].phoneid;
					var model = data[i].model;
					var screen_size = data[i].screen_size;
					var price = data[i].price;
					var color = data[i].color;
					var temp = "<div id=col1> <img src=http://localhost:3000/images/"+phoneid+".jpeg" + " "+ "align=left" + " " +	  "alt=No" +
								"image available></div><div id=col2><p></p></div><div id=col3 ><table class=tab" + ">"+
								"<tr><th class=heading1>Phone Details:</th></tr>"+
								"<tr><td><b>Company: "+ company + "</b></td></tr>"+
								"<tr><td><b>Model: "+ model + "</b></td></tr>"+
								"<tr><td><b>Screen size: "+ screen_size + "</b></td></tr>"+
								"<tr><td><b>Price: "+ price + " INR</b></td></tr>"+
								"<tr><td><b>Color: "+ color + "</b></td></tr>"+"</table></div>"+ " "


								;
						myString= myString + temp;
					};
					showIt(myString);

		
	
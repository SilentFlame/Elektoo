var express=require('express');
var app=express();
var  mysql=require('mysql');
var Sequelize = require('sequelize');


var sequelize = new Sequelize('data', 'root', 'data', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'data',
  database : 'data'
});

connection.connect();

var bodyParser=require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('public')); // serving static files in express.

app.disable('etag');

app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/JS'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/',function(req,res){
res.render('start.html');
});

app.get('/query',function(req,res){
res.render('index.html');
});

var body=[];


// autocomplete feature implementation
app.get('/testIt',function(req,res){
 res.setHeader("Access-Control-Allow-Origin", "*");
  body=req.query.name;
 console.log(body);
 res.send(body);
});



app.get('/search',function(req,res){

  
  var param_p = ['company', 'model','color'];
  var exp_words = ['with', 'having', 'have', 'of', 'not', "don't", 'for', 'amount', 'price', 'cost', 'and',
                   'lessthan', 'greaterthan', 'between', 'under', 'equal', 'below', 'above', 'phone', 'company',
                    'rs', 'color', 'coloured', 'screen', 'screensize', 'or'];

 console.log("query string");
 // console.log(req.query.key);
  var arr = req.query.key.toString().split(/\b\s+/);

  var len = arr.length;
  var last_word = arr[len-1].toLowerCase();

  var data = [];
  var str = '^' + last_word + '.*';

 // console.log('regex');
 // console.log(str);
  var re = new RegExp(str, "g");

  for(var i=0; i<exp_words.length; i++)
  {
    if(re.test(exp_words[i]))
      data.push(body+" "+exp_words[i]);
  } 
console.log(data);

// partially manipulating asynchronous callback by creating partial function for each turn of the loop
  for(var i=0; i<param_p.length; i++) (function(i){

    var  qstr='select distinct '  + param_p[i] + ' from data where ' + param_p[i] + ' like "' + last_word + '%";'; 
    
     // console.log(qstr);
    connection.query(qstr, function(err, rows, fields) {

    if (err) throw err;
   

    for(var j=0; j<rows.length; j++)
     {
 
       var temp2 = qstr.split(/\b\s+/);
   //    console.log(temp2[2]);
    //   console.log(rows[j][temp2[2]]);
       data.push(body+" "+rows[j][temp2[2]]);
      
      }
    
    res.end(JSON.stringify(data));
  
  });
  }) (i);

});



app.get('/getcompanydata',function(req,res) {
 
 // list of "expected words" as parameters' name in the query
    var param_phone = ['phone', 'mobile', 'company', 'phones'];
    var param_price = ['amount', 'price', 'cost', 'costs'];
    var param_camera = ['camerasize', 'camera'];
    var param_screen = ['screen', 'screensize'];
    var param_color = ['color', 'coloured', 'colored','coloured', 'colors'];


    // List of values for parameters as available in the database.
  	var phones_list = ['Samsung' , 'Motorola', 'Sony', 'Meizu', 'Gionee', 'Apple' ,
                       'Asus', 'HTC', 'Google', 'Spice', 'Nokia'];
  	var color_list = ['black', 'white', 'blue', 'pink', 'red', 'grey'];

    // variable to check whether the operator is explicitly mentioned in the query or not.
    var optr=0;

    // dictionary consisting of different operators and their corresponding "meanings" as key-value pairs 
    var opt1 = {"having": " = ", "have": " = ", "lessthan" : " < " ,"less" : " < " , "greaterthan": " > ","greater than": " > ", 
                  "not":" != ", "above": " > ", "below": " < ", "under": " < ", "equal": " =", "of": "=" };
    
    // dictioanry of operators to be used in case of presence of negation keywords in the query.
    var opt2 = {"having": " != ", "have": " != ", "lessthan" : " >= " , "greaterthan": " <= ", 
                  "not":" != ", "above": " <= ", "below": " >= ", "under": " >= ", "equal": " !=", "of": "!=" };
   

   // global_query that will fetch the result from the database.
    var global_string = ""; 

   // initial query
  	var temp_str='select * from data where  company = "Samsung" and';

    // "flag" variable is set to 1 when the first parameter is identified in the query.
  	var flag=0;

    // "temp" variable is set to 1 when any word present in the query is identified as a parameter.
    var temp=0;

    // length of input string
    var len_inputstr=req.query.q.toString().length;

    // making a copy of the input string .
    var input_str=req.query.q.toString().slice(0, len_inputstr+1);
    
	// local variable "count" to validate the string concatinaton operations. 
    var count =0;

	// processing the input query
    while(input_str!="")
    {	

    	// removing the last four words ( keyword "and" , parameter, operator, value) from the input query as 
    	
// explanation:
    	// they are associated with the "or" keyword.
    	// example if the user types: "samsung phone with black color or white color",
    	// then the temp_str till first iteration will be " select * from <tablename> where company="Samsung" and 
    	// color = 'black' ";
    	// now we need to form the second query using the string: "select * from <tablename> where company="Samsung" "
    	// and then append the additional properties to it, to make it as "select * from <tablename> where company="Samsung"
    	// and color = 'white' ";".

    	// removing trailing whitespaces from the temoporary string
    	temp_str = temp_str.replace(/\s*$/,"");

    	// remove last word four times
    	for(var g=0; g<4; g++)
    		remove_Lastword();
		
    	// if it is not the first query, append "union" after the query made till date.
    	if(count!=0)
    		global_string = global_string.concat(' union ');
  

    	// check the position where the keyword "or" occurs.
    	var index = input_str.indexOf(" or");

    	// if "or" keywords occurs.    	
    	if(index!=-1)
    	{

    		// curr_str is the intial part of the input string until the keyword "or" occurs, i.e. the first part of input 
    		// string after after splitting the string using "or" as keyword .
    		var curr_str = input_str.substring(0, index);

    		// updating the input string , i.e. removing the intial part of the input string and
    		// considering only the part arter the keyword "or".
    		input_str = input_str.slice(index+3);

    		// removing whitespaces from the beginning of the string.
    		input_str = input_str.replace(/^\s*/,"");

    		// tl; dr
    		// curr_str is the string of which we are currently running the query and "input_str" is the left out string 
    		// after removing the "curr_string" from the input string.
    	}

    	// if "or" keyword doesn't occur.
    	else
    	{
    		var len_Inputstr=input_str.length;
    		var curr_str= input_str.slice(0, len_Inputstr+1);

    		// since no "or" keyword identified, the input string now becomes empty.
    		input_str="";
    	}

    	
    
    	// initializing an array "arr" that will hold the input string in a tokenized manner.
    	var arr = "";

    	// tokenizing the current string(user query) using whitespaces in an array of strings "arr"
    	arr = curr_str.split(/\b\s+/);

    	// Normalising the entire search query and converting it into small letters for structured search.  
    	for (var i = 0; i < arr.length; i++) {   
      		arr[i]=arr[i].toLowerCase();
    	};


      // iterating over the entire array in a word by word fashion and identifying that word as a parameter
  		for(var i=0; i<arr.length; i++)
  		{
          temp=0;

          var start_index=i-2 ;
          start_index=Math.max(start_index, 0);
          var end_index=Math.min(i+3, arr.length);

       //   console.log(start_index);
         // console.log(end_index);

          // "start_index" and" end_index" are the variables that bound the indices around the parameter,
          // in which the "values" and the "operators" will be looked for.

          lowerpar=arr[i].toLowerCase();
          match_param(param_phone, lowerpar,start_index, end_index);
          if(temp!=1)
             match_param(param_price, lowerpar,start_index, end_index);

          if(temp!=1)
             match_param(param_camera, lowerpar,start_index, end_index);

          if(temp!=1)
             match_param(param_screen, lowerpar,start_index, end_index);

          if(temp!=1)
             match_param(param_color, lowerpar,start_index, end_index);

  		}

  		// appending temp_str string into the global_string
  		global_string = global_string.concat(temp_str);

  		// console.log("global string in the end");
  		// console.log(global_string);
  		count++;

  	}

      // concatinating the query string with a semicolon in the end.
  	global_string=global_string.concat(";");


    // functions that gets invoked , whenever we need to check a word for a parameter.
    // "word" here refers to the word present in the input query that is being ckecked for a parameter.
    // e.g. for the query, "samsung phone ", here "word" will be phone.
    function match_param(param_list, word, start_index, end_index){

      optr=0;
      for(var j=0; j<param_list.length; j++)
      { 

          // incase the word is a parameter
         if(param_list[j].toLowerCase().localeCompare(word)==0)
         {         
 
         
          // console.log("parameter");
          console.log(param_list[0]);
           temp=1;


           if(flag==1)
          	 temp_str=temp_str.concat(" and ");


           // calling the helper functions "phone_query" and "price_query" to check
           // for values and operators for the identified parameter.

           if(param_list[0]=='phone')
              phone_query(start_index, end_index, phones_list, 'company');
           else if(param_list[0]=='amount')
              price_query(start_index, end_index, 'price');
           else if(param_list[0]=='camerasize')
              price_query(start_index, end_index, 'camera');
           else if(param_list[0]=='screen')
              price_query(start_index, end_index, 'screen_size');
           else if(param_list[0]=='color')
              phone_query(start_index, end_index, color_list, 'color');
           flag=1;
            break;
          }
    }
  }

  	// function to get values for corresponding parameters
  	function phone_query(start_index, end_index, list, parmt){

      if(parmt.toLowerCase().localeCompare("company")==0)
      {
        var lim=arr.indexOf("phone");
        end_index=lim;

        if(lim==-1)
          end_index=arr.indexOf("phones");
    
      }      

     // "list" here refers to either "phones_list" or "color_list" to check for the value of the parameter. 
     // function that checks for the operator for the corresponding parameter in the query.
      check_opt( start_index, end_index, parmt);

  		for(var w=start_index; w<end_index; w++)
  		{
  			// fr is a local variable that checks whether any value corresponding to the parameter was found
  			// in the query or not.
      
  			var fr=0;
  			for(var fe=0; fe<list.length; fe++)
  			{
         
  				if(arr[w].toLowerCase().localeCompare(list[fe].toLowerCase())==0)
  				{
  					// console.log("parameter value");
  					// console.log(arr[w]);
  					fr=1;
  					break;
  				}
  			}
  			if(fr==1)
  				break;
  		}
  	

  		// if operator is already concatenated (using the "check_opt" function, 
  		// then just concatenate the value in the query string)
  		if(w!=end_index && optr==1)
  			temp_str=temp_str.concat(" '", list[fe], "' ");
  		
  		// if(no operator was found for the parameter, smply append and "=" in the query)
        else if(w!=end_index)
        	temp_str=temp_str.concat(" ", parmt, " = ", " '", list[fe], "' ");

        // if no value specified for the given parameter, then just assure that the given parameter shouldn't be null
  		else
  			temp_str=temp_str.concat(" " ,parmt, " != ", '""', " ");
  	}  


  	// function to get the "numeric" values for example, values for parameters like "price", "screensize", etc.
  	function price_query(start_index, end_index, parmt){

        check_opt( start_index, end_index, parmt);
  		  for(var w=start_index; w<end_index;w++)
  			{
  				var fr=0;

          // incase of the parameters such as "price" , "camerasize", "screensize", check for the nearby numerical value.
          // also govern the range limits. for example in case of price , it should be greater than 1000rs, etc.
  				if(parseInt(arr[w])==arr[w]	 &&  ((parseInt(arr[w])>1000 && (parmt.localeCompare('price')==0)) || (parseInt(arr[w])<10 && (parmt.localeCompare('screen_size')==0)) || (parseInt(arr[w])<20 && (parmt.localeCompare('camera')==0))))  
  				{
  					var operator=" = ";
  					break;
  				}
  			}


  			//same logic as given in the phone_query function above.
     		 if(w!=end_index && optr==1)
        		temp_str=temp_str.concat( " " , parseInt(arr[w]));
     		 else if(w!=end_index)
        		temp_str=temp_str.concat(" ", parmt, " = ", parseInt(arr[w]));
  	  		 else if(w==end_index && optr!=1)
  				temp_str=temp_str.concat(" ", parmt, " ", "!= ", 0, " ") ;
      
      		// incase a negation is specifed in the query, then make the values of that attribute as zero.
      		// example, input query: "samsung phone with no camera".
      		// The query string will be: "select * from <tablename> where company='Samsung' and camera=0 ".
      		else 
      		{
      			// remove the already appended "!=" from the query formed previously.
          		temp_str = temp_str.substring(0, temp_str.length - 3);
          		temp_str = temp_str.concat( " = ", 0, " ") ;
      		}
    
  	}


    function check_opt(start_index, end_index, parmt){

      var operator;
      for( var w=start_index; w<end_index; w++)
      {

        // if there is a sign of negation in the query, operate on "opt2", otherwise operate on "opt1".
        if((arr[w].toLowerCase().localeCompare("don't")==0) || (arr[w].toLowerCase().localeCompare("not")==0) || (arr[w].toLowerCase().localeCompare("no")==0))
        {
          
          // checking for the word after the negation word.
          // if no word is present it is simplt assumed to be "not equal to".
          if(arr[w+1] in opt2)
            operator = opt2[arr[w+1]];
          else
            operator = " != " ;
            break;
        } 
        else if(arr[w] in opt1){
          operator = opt1[arr[w]];
        break;
        }
      }

      // if operator is specified, append it to the query string.
      if(w!=end_index)
      {
        optr=1;
        temp_str=temp_str.concat(parmt, " " ,operator) ;
      }
    
    }



    // function that removes last word from a string.
    function remove_Lastword()
    {
    	// get the index of last whitespace and chop off the rest part of the string, i.e. by this technique,
    	// the last word in "temp_str" will get removed .

    	var lastIndex = temp_str.lastIndexOf(' ');
    	temp_str = temp_str.substring(0, lastIndex);
    	temp_str = temp_str.replace(/\s*$/,"");
    }

  	// executing the query
    sequelize.query(global_string).spread(function(studentsdata,metadata)
    {
       res.setHeader("Access-Control-Allow-Origin", "*");
       res.json({StudentsDataOut:studentsdata})
       // res.render('demo.html')   
   }); 
});



app.get('/phoneinfo',function(req,res) {
    console.log("This is the query -> ");
    console.log(req.query.pid);
    QueryString = 'select * from data where phoneid= '+ req.query.pid + ';';
    sequelize.query(QueryString).spread(function(studentsdata,metadata)
    {
       res.setHeader("Access-Control-Allow-Origin", "*");
       res.render('phoneinfo.html',{StudentsDataOut:studentsdata})
       // res.render('demo.html')   
   });
});

app.get('/brands',function(req,res){
    QueryString='select distinct(company) from data;';
/*connection.query((QueryString),function(err,rows,field){
if(err) throw err;
console.log(rows[0].company);

});*/
    sequelize.query(QueryString).spread(function(studentsdata,metadata){
     console.log(QueryString);
      res.setHeader("Access-Control-Allow-Origin","*");
      console.log(studentsdata[0].company);
      res.render('brands.html',{CompanyData:studentsdata})
    });
});

app.get('/matrix',function(req,res){
    QueryString="select * from data where company ='"+req.query.brand+ "' order by price;";
    sequelize.query(QueryString).spread(function(studentsdata,metadata){
      res.setHeader("Access-Control-Allow-Origin","*");
      res.render('matrix.html',{MatrixData:studentsdata})
    });
});

app.get('/result',function(req,res){
 res.setHeader("Access-Control-Allow-Origin", "*");
  body=req.query.name;
 console.log(body);
 //res.send(body);
 function parseParms(str) {
    var pieces = str.split("&")
        // process each query pair
    QueryString="select * from data where ";

    for (i = 0; i < pieces.length-1; i++) {
        QueryString=QueryString+pieces[i]+" and ";
    }
    QueryString=QueryString+pieces[pieces.length-1]+";";
    return QueryString;
    //console.log(data);
  //  return data;
}
    qstr=parseParms(body);
    console.log(qstr);
    res.send(qstr);
});
app.get('/respo',function(req,res){
	QueryString=req.query.name;
	console.log(QueryString);
	console.log("one");
	//res.send(QueryString);
	sequelize.query(QueryString).spread(function(studentsdata,metadata){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.send(studentsdata);
    });
});

var server=app.listen(3000,function(){
console.log("We have started our server on port 3000");
});


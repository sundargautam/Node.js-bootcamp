var students=[{
    "first Name": "Subash",
    "last Name":"Adhikari",
    dob:"12/12/1998",
    address:{
        "city":"Kathmandu",
        "country":"Nepal"
    },
    "best friends":["Sagar","Saurav","Sushil","Sarita"],
    getFullName:function(){
        return this["first Name"]+" "+this["last Name"];
    },
    getAge:function(){
        var today=new Date();
        var birthDate=new Date(this.dob);
        return today.getFullYear()-birthDate.getFullYear();
    }
},{
    "first Name": "Sagar",
    "last Name":"Adhikari",
    "best friends":["Subash","Saurav","Sushil","Sarita"],
}];

console.log(students[0].getFullName());
console.log(students[0].dob);
console.log(students[0]["first Name"]);
console.log(students[0]["best friends"][0]);
console.log(students[0]["address"]["city"]);
console.log(students[0]["address"].city);
console.log(students[0].address.city);
console.log(students[0].address["city"]);

if(students[1].address){
    console.log("has address");
}
else{
    console.log("no address");
}

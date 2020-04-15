import { BASEURL } from "./globals";
import { Sort } from "./user-profile/SortingUser";
import {Notifications} from "./notification";
const token=JSON.parse(sessionStorage.getItem("user_info"))["token"];
class Notify
{
    deviceId:number =0;
    userId:number= 0;
    token:string ="";
    constructor(token:string)
    {
        this.token =token;
    }
    getNotification(URL:any)
    {
        fetch(
            BASEURL + "/api/notification"+URL 
        ,{
            headers: new Headers({"Authorization": `Bearer ${token}`})
        })
            .then(Response => Response.json())
            .then(data => {
                console.log(data);
                (document.getElementById("notification_data") as HTMLTableElement).innerHTML = "";
            
                for (let element in data) {
                    let res = new Notifications(data[element],token);
                    res.getNotificationTable();
                }
            })
            .catch(err => console.log(err));

    }
    notification(id:any)
    {
        let URL = "?id=" + id;
        this.getNotification(URL);
    }
    notificationSearch(search:string)
    {
        let URL = "?search="+search;
        this.getNotification(URL);
    }
    notificationSort(sort:string,direction:string)
    {
        let URL = "?sort="+sort +"&direction=" +direction;
        this.getNotification(URL);
    }
    acceptNotification(data:Notify)
    {
        fetch(BASEURL + "/api/ReturnRequest", {
            method: "POST",
            headers: new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]]),
            body: JSON.stringify(data),
        }).catch(Error => console.log(Error));   
    }   
    rejectNotification(data:Notify)
    {
        let  data1 = JSON.stringify(data);
        console.log(data);
        fetch(BASEURL + "/api/ReturnRequest/reject", {
            method: "PUT",
            headers: new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]]),
            body: data1,
        }).catch(Error => console.log(Error));   
    }   
}
document.getElementById("fixed-header-drawer-exp").addEventListener("keyup",function(e)
{
    let search = (document.getElementById("fixed-header-drawer-exp")as HTMLInputElement).value;
    console.log(search);
    notify.notificationSearch(search);    
});
document.addEventListener("click", function (e) {

    if ((e.target as HTMLTableElement).tagName == 'TH') {
       
        
        let id = (e.target as HTMLTableHeaderCellElement);
        let column = (e.target as HTMLTableHeaderCellElement).dataset.id;
	    let sorts = new Sort();
        let direction =sorts.checkSortType(id);
        console.log(direction);
        notify.notificationSort(column,direction);
           
        }
        
            if ((e.target as HTMLButtonElement).className == "accept-button") {
               if(confirm("Are you sure you want to submit the device?"))
               {
                   
                    notify.deviceId = +(e.target as HTMLButtonElement).dataset.value;
                    notify.userId = +(e.target as HTMLButtonElement).dataset.userid;
                    notify.acceptNotification(notify);
                 console.log("notification accepted");
               }
            }
        if ((e.target as HTMLButtonElement).className == "reject-button") {
               if(confirm("Are you sure you donot want to submit the device?"))
               {
                
                notify.deviceId = +((e.target as HTMLButtonElement).dataset.value);
                notify.userId = +(e.target as HTMLButtonElement).dataset.userid;
                notify.rejectNotification(notify);
                
               }
               
            }
        
});

let notify = new Notify(token);
const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get("user_id");
      console.log(myParam);
if(myParam)
      notify.notification(myParam);
else
notify.notification("");
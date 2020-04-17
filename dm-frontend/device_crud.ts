import { BASEURL } from "./globals";
import { formatDate1 } from "./utilities";
import { HitApi } from "./Device-Request/HitRequestApi";
import { populateDropdown } from "./dropdown";

export class AddDevice {
    type: string;
    brand: string;
    status_id: number;
    model: string;
    color: string;
    price: string;
    serial_number: string;
    warranty_year: string;
    purchase_date: string;
    specification_id: number;
    entry_date: string;
    ram: string;
    storage: string;
    screen_size: string;
    connectivity: string;
    token: string = "";
    constructor(token: string) {
        this.token = token;
    }
    async brandDropdown() {
        const URL = BASEURL + "/api/dropdown/brands";
       const brands = await new HitApi(this.token).HitGetApi(URL);
       populateDropdown((document.getElementById("brand") as HTMLSelectElement),brands);
        
    }
    async typeDropdown() {
        const URL = BASEURL + "/api/dropdown/types";
        const types = await new HitApi(this.token).HitGetApi(URL);
        populateDropdown((document.getElementById("type") as HTMLSelectElement),types);
       
    }
    async modelDropdown() {
        const URL = BASEURL + "/api/dropdown/models";
        const models = await new HitApi(this.token).HitGetApi(URL);
        populateDropdown((document.getElementById("model") as HTMLSelectElement),models);
    }
    Create_device() {
        let data = this.addDataFromForm();
        console.log(data);
        fetch(BASEURL + "/api/Device/add", {
            method: "POST",
            headers: new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]]),
            body: data,
        }).catch(Error => console.log(Error));

    }
    async getDataToForm() {
        let data: any
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get("device_id");
        console.log("device_id" + myParam);
        const obj = new AddDevice(this.token);

        let res = await fetch(
            BASEURL + "/api/Device/device_id/" + myParam,
            {
                headers: new Headers({"Authorization": `Bearer ${this.token}`})
            })
        data = await res.json();
        console.log(data);
        this.populateDataToForm(data);

        return null;
    }
    populateDataToForm(data: any) {
        console.log(data[0].device_brand_id);

        (document.getElementById("inputbrand") as HTMLInputElement).value = data[0].brand;
        (document.getElementById("inputtype") as HTMLInputElement).value = data[0].type;
        (document.getElementById("status") as HTMLInputElement).value = data[0].status_id;
        (document.getElementById("inputmodel") as HTMLInputElement).value = data[0].model;
        (document.getElementById("color") as HTMLInputElement).value = data[0].color;
        (document.getElementById("price") as HTMLInputElement).value = data[0].price;
        (document.getElementById("serial_number") as HTMLInputElement).value = data[0].serial_number;
        (document.getElementById("warranty_year") as HTMLInputElement).value = data[0].warranty_year;
        (document.getElementById("purchase_date") as HTMLInputElement).value = formatDate1(data[0].purchase_date);
        (document.getElementById("specification") as HTMLInputElement).value = data[0].specification_id;
        (document.getElementById("entry_date") as HTMLInputElement).value = formatDate1(data[0].entry_date);
    }

    update_device(device_id: any) {
        let data = this.addDataFromForm();
        console.log(data);
        fetch(BASEURL + "/api/Device/update/" + device_id, {
            method: "PUT",
            headers: new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]]),
            body: data,
        }).catch(Error => console.log(Error));

    }
    addDataFromForm() {
        this.type = ((document.getElementById("inputtype") as HTMLSelectElement).value);
        this.brand = ((document.getElementById("inputbrand") as HTMLInputElement).value);
        this.status_id = +((document.getElementById("status") as HTMLInputElement).value);
        this.model = (document.getElementById("inputmodel") as HTMLInputElement).value;
        this.color = (document.getElementById("color") as HTMLInputElement).value;
        this.price = (document.getElementById("price") as HTMLInputElement).value;
        this.serial_number = (document.getElementById("serial_number") as HTMLInputElement).value;
        this.warranty_year = (document.getElementById("warranty_year") as HTMLInputElement).value;
        this.purchase_date = (document.getElementById("purchase_date") as HTMLInputElement).value;
        this.specification_id = +((document.getElementById("specification") as HTMLInputElement).value);
        this.entry_date = (document.getElementById("entry_date") as HTMLInputElement).value;
        return JSON.stringify(this);
    }
    addDataToBrand() {

        console.log("brand");
        let data = new AddDevice(this.token);
        data.brand = (document.getElementById("brands") as HTMLInputElement).value;
        return JSON.stringify(data);
    }
    async addNewBrand() {

        let data1 = this.addDataToBrand();
        console.log(data1);
        let data = await fetch(BASEURL + "/api/Device/brand", {
            method: "POST",
            headers: new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]]),
            body: data1,
        });

        return null;
    }
    addDataToType() {

        console.log("type");
        const data = new AddDevice(this.token);
        data.type = (document.getElementById("types") as HTMLInputElement).value;
        return JSON.stringify(data);
    }
    async addNewType() {

        let data1 = this.addDataToType();
        console.log(data1);
        let data = await fetch(BASEURL + "/api/Device/type", {
            method: "POST",
            headers: new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]]),
            body: data1,
        });
        return null;
    }
    addDataToModel() {

        console.log("model");
        const data = new AddDevice(this.token);
        data.model = (document.getElementById("models") as HTMLInputElement).value;
        return JSON.stringify(data);
    }
    async addNewModel() {

        let data1 = this.addDataToModel();
        console.log(data1);
        let data = await fetch(BASEURL + "/api/Device/model", {
            method: "POST",
            headers: new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]]),
            body: data1,
        });
        return null;
    }


    addDataToSpecification() {

        console.log("type");
        const data = new AddDevice(this.token);
        data.ram = (document.getElementById("RAM") as HTMLInputElement).value;
        data.storage = (document.getElementById("Storage") as HTMLInputElement).value;
        data.screen_size = (document.getElementById("Screen_size") as HTMLInputElement).value;
        data.connectivity = (document.getElementById("Connectivity") as HTMLInputElement).value;
        return JSON.stringify(data);
    }
    async addNewSpecification() {

        let data1 = this.addDataToSpecification();
        console.log(data1);
        let data = await fetch(BASEURL + "/api/Device/addspecification", {
            method: "POST",
            headers:new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]]),
            body: data1,
        });
        return null;
    }



}

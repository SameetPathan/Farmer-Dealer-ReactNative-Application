import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set,get ,update,remove,onValue } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyBvw8hBAjOhGi-L-AEL3BZwlMCX5I2FMhY",
    authDomain: "farmer-dealer-react-app.firebaseapp.com",
    databaseURL: "https://farmer-dealer-react-app-default-rtdb.firebaseio.com",
    projectId: "farmer-dealer-react-app",
    storageBucket: "farmer-dealer-react-app.appspot.com",
    messagingSenderId: "91274831911",
    appId: "1:91274831911:web:8eae588a6d94b20480c602"
};


export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export function register(username, phoneNumber, aadharCard, userType, password, address) {
    const dbb = getDatabase();
    const userRef = ref(dbb, 'users/' + phoneNumber);
    onValue(userRef, (snapshot) => {
      const user = snapshot.val();
      if (user) {
      } else {
        set(userRef, {
          username: username,
          usertype: userType,
          aadharcard: aadharCard,
          address: address,
          password: password
        });
        alert('Registration Successful');
      }
    });
  }
  

export function addproducts(id,productName,productQuantity,productDescription,productPrice,whoadded,
    imageurl){
    const dbb = getDatabase();
    set(ref(dbb, 'products/' + id), {
        productName: productName,
        productQuantity:productQuantity,
        productDescription: productDescription,
        productPrice:productPrice,
        whoadded:whoadded,
        imageurl:imageurl,
        dealerphone:"",
        dealeraddress:"",
        dealerprice:"",
        quantiywant:"",
        orderstatus:"",
        paymentstatus:""
    });
    alert("Product added Successfull")
}

export function buyproduct(id,dealerphone,dealeraddress,dealerprice,quantiywant,orderstatus,paymentstatus) {
    const dbb = getDatabase();
    const prodRef = ref(dbb, 'products/' + id);

    get(prodRef).then((snapshot) => {
        if (snapshot.exists()) {
            const proData = snapshot.val();
            proData["dealerphone"] = dealerphone;
            proData["dealeraddress"] = dealeraddress;
            proData["dealerprice"] = dealerprice;
            proData["quantiywant"] = quantiywant;
            proData["orderstatus"] = orderstatus;
            proData["paymentstatus"] = paymentstatus;
            proData["orderplace"] = true;
            update(prodRef, proData).then(() => {
                alert('Your order has been placed successfully!');
            }).catch((error) => {
                alert('Error Placing Order: ', error);
            });
        } else {
           // console.error('Product data not found!');
        }
    }).catch((error) => {
        alert('Error getting product data: ', error);
    });
}

export function AcceptReject(id,fprice,status) {
    const dbb = getDatabase();
    const prodRef = ref(dbb, 'products/' + id);

    get(prodRef).then((snapshot) => {
        if (snapshot.exists()) {
            const proData = snapshot.val();
            proData["orderstatus"] = status;
            proData["productQuantity"]=fprice;
            update(prodRef, proData).then(() => {
                if(status=="accepted")
                {
                alert('Order Accepted successfully!');
                }else{
                    alert('Order Rejected successfully!');
                }
            }).catch((error) => {
                alert('Error Accepting Order: ');
            });
        } else {
            alert('Order data not found!');
        }
    }).catch((error) => {
        alert('Error getting Order data: ');
    });
}

export function pay(id,status) {
    const dbb = getDatabase();
    const prodRef = ref(dbb, 'products/' + id);

    get(prodRef).then((snapshot) => {
        if (snapshot.exists()) {
            const proData = snapshot.val();
            proData["paymentstatus"] = status;
            update(prodRef, proData).then(() => {
                
                alert('Payment Accepted successfully!');
               
            }).catch((error) => {
                alert('Error Accepting Payment: ', error);
            });
        } else {
            alert('Order data not found!');
        }
    }).catch((error) => {
        alert('Error getting Order data: ', error);
    });
}



export function deleteProduct(id) {
    const db = getDatabase();
    const petRef = ref(db, 'products/' + id);
  
    remove(petRef).then(() => {
      alert('Product deleted successfully!');
    }).catch((error) => {
      console.error('Error deleting Product: ', error);
    });
  }
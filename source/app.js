    //firebase config bilgilerimiz
    var firebaseConfig = {
        apiKey: "AIzaSyCWmVKXFQuhLXshVCtsIfjKJiCb9Aad18I",
        authDomain: "database-001-83ede.firebaseapp.com",
        databaseURL: "https://database-001-83ede-default-rtdb.firebaseio.com",
        projectId: "database-001-83ede",
        storageBucket: "database-001-83ede.appspot.com",
        messagingSenderId: "358766032997",
        appId: "1:358766032997:web:e78da608caa081a1042e8c",
        measurementId: "G-9KE9TJJNT2"
    };
    firebase.initializeApp(firebaseConfig);//sayfaya config entegre edildi.
    firebase.analytics();
    //değişkenler tanımlandı.
    const productCode = document.getElementById('productCode');
    const productName = document.getElementById('productName');
    const categoryName = document.getElementById('categoryName');
    const brandName = document.getElementById('brandName');
    const price = document.getElementById('price');
    const addBtn = document.getElementById('addBtn');
    const updateBtn=document.getElementById('updateBtn');
    const removeBtn=document.getElementById('removeBtn')
    const logoutBtn=document.getElementById('logout')
    //firebase database tanımlandı.
    const database = firebase.database();
    const rootRef = database.ref('products');
    //tabloya eklem işlemi
    rootRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var data = childSnapshot.val();
            var productCode = data.productCode;
            var productName = data.productName;
            var categoryName = data.categoryName;
            var brandName = data.brandName;
            var price = data.price;
            var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
            var newRow = tbodyRef.insertRow();
            var newCell = newRow.insertCell();
            var newCell2 = newRow.insertCell();
            var newCell3 = newRow.insertCell();
            var newCell4 = newRow.insertCell(); 
            var newCell5 = newRow.insertCell();
            var newText = document.createTextNode(productCode);
            var newText2 = document.createTextNode(productName);
            var newText3 = document.createTextNode(categoryName);
            var newText4 = document.createTextNode(brandName);
            var newText5 = document.createTextNode(price);

            newCell.appendChild(newText);
            newCell2.appendChild(newText2);
            newCell3.appendChild(newText3);
            newCell4.appendChild(newText4);
            newCell5.appendChild(newText5);
        });
        //arama butonu komutları
        const searchInput = document.getElementById("search");
        const rows = document.querySelectorAll("tbody tr");
        console.log(rows);
        searchInput.addEventListener("keyup", function (event) {
            const q = event.target.value.toLowerCase();
            rows.forEach((row) => {
                row.querySelector("td").textContent.toLowerCase().startsWith(q)
                    ? (row.style.display = "table-row")
                    : (row.style.display = "none");
            });
        });
    });
    //data güncelleme kısmı
    updateBtn.addEventListener('click', (e) =>{
        e.preventDefault();
        const newData={
            productCode: productCode.value,
            productName: productName.value,
            categoryName: categoryName.value,
            brandName: brandName.value,
            price: price.value,
        };
        const updates = {};
        updates['/products/'+productCode.value]=newData;
        database.ref().update(updates);
        location.href = './products.html'; //işlem sonrası gösterilen dosyaya gidiyor
    });
    //data silme işlemi gerçekleşmekte
    removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        rootRef.child(productCode.value).remove()
        .then(() => {
            window.alert('ürün kodu veritabanından silindi')
        });
        // .catch(error => {
        //     console.error(error);
        // });
    });
    //data ekleme işlemi
    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        rootRef.child(productCode.value).set({
            productCode: productCode.value,
            productName: productName.value,
            categoryName: categoryName.value,
            brandName: brandName.value,
            price: price.value,
        });
        location.href = './products.html';
    });
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        location.href = './login.html';
    });

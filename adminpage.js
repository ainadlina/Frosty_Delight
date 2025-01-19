document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const itemDescription = document.getElementById('itemDescription').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemImage = document.getElementById('itemImage').value;

    const data = {
        name: itemName,
        description: itemDescription,
        price: itemPrice,
        image: itemImage
    };

    fetch('http://your-backend-endpoint.com/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerHTML = `<p>Item added successfully!</p>`;
        document.getElementById('adminForm').reset();
    })
    .catch(error => {
        document.getElementById('message').innerHTML = `<p>Error adding item. Please try again.</p>`;
        console.error('Error:', error);
    });
});

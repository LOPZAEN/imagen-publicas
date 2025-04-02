
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/create-product', async (req, res) => {
    const product = req.body;

    try {
        const response = await fetch("https://lopzaen.odoo.com/jsonrpc", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "call",
                params: {
                    service: "object",
                    method: "execute_kw",
                    args: [
                        "lopzaen",
                        2,
                        "1c78d7b325fcba8d23f8f26baa9e6c6d8d32aa54",
                        "product.template",
                        "create",
                        [product]
                    ]
                },
                id: Math.floor(Math.random() * 1000)
            })
        });

        const data = await response.json();
        if (data.result) {
            res.json({ success: true, id: data.result });
        } else {
            res.status(500).json({ success: false, error: "Odoo error", details: data });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Backend LOPZAEN corriendo');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

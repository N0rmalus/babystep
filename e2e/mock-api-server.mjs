import { createServer } from 'node:http';

const port = Number(process.env.MOCK_API_PORT || 4010);

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'Content-Type, Authorization',
};

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const category = {
  id: 'cat-1',
  name: 'Kategorija',
  billboard: {
    id: 'test-billboard',
    label: 'Test billboard',
    imageUrl: '/placeholder.webp',
  },
};

const subcategory = {
  id: 'sub-1',
  name: 'Subkategorija',
  categoryId: category.id,
  category,
};

const createInitialProducts = () => {
  return [
    {
      id: 'product-1',
      subcategoryId: subcategory.id,
      name: 'Test Product Name',
      price: '19.99',
      amountInStock: 10,
      isFeatured: true,
      isArchived: false,
      description: 'Test product description',
      images: [
        {
          id: 'img-1',
          url: '/placeholder.webp',
        },
      ],
      subcategory,
    },
  ];
};

let products = createInitialProducts();

const resetProducts = () => {
  products = createInitialProducts();
};

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    ...corsHeaders,
    'content-type': 'application/json',
  });
  res.end(JSON.stringify(payload));
};

const readBody = (req) => {
  return new Promise((resolve, reject) => {
    let rawBody = '';

    req.on('data', (chunk) => {
      rawBody += chunk;
    });

    req.on('end', () => {
      if (!rawBody) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
};

const findProductById = (productId) => {
  return products.find((product) => product.id === productId);
};

const handleApiGet = (url, res) => {
  if (url.pathname === '/api/test-store/categories') {
    sendJson(res, 200, [deepClone(category)]);
    return true;
  }

  if (url.pathname === '/api/test-store/subcategories') {
    sendJson(res, 200, [deepClone(subcategory)]);
    return true;
  }

  if (url.pathname === '/api/test-store/billboards/test-billboard') {
    sendJson(res, 200, deepClone(category.billboard));
    return true;
  }

  if (url.pathname === '/api/test-store/products') {
    const subcategoryId = url.searchParams.get('subcategoryId');
    const isFeatured = url.searchParams.get('isFeatured');

    const filteredProducts = products.filter((product) => {
      if (product.isArchived) {
        return false;
      }

      if (subcategoryId && product.subcategoryId !== subcategoryId) {
        return false;
      }

      if (isFeatured === 'true' && !product.isFeatured) {
        return false;
      }

      return true;
    });

    sendJson(res, 200, deepClone(filteredProducts));
    return true;
  }

  const productMatch = url.pathname.match(/^\/api\/test-store\/products\/([^/]+)$/);

  if (productMatch) {
    const productId = productMatch[1];
    const product = findProductById(productId);

    if (!product || product.isArchived) {
      sendJson(res, 404, { message: 'Not found' });
      return true;
    }

    sendJson(res, 200, deepClone(product));
    return true;
  }

  return false;
};

const server = createServer(async (req, res) => {
  const method = req.method || 'GET';
  const url = new URL(req.url || '/', `http://127.0.0.1:${port}`);

  if (method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  if (url.pathname === '/__test/reset' && method === 'POST') {
    resetProducts();
    sendJson(res, 200, { ok: true });
    return;
  }

  if (url.pathname === '/__test/update-product' && method === 'POST') {
    try {
      const body = await readBody(req);
      const { id = 'product-1', ...changes } = body || {};
      const product = findProductById(id);

      if (!product) {
        sendJson(res, 404, { message: 'Product not found' });
        return;
      }

      Object.assign(product, changes);
      sendJson(res, 200, deepClone(product));
      return;
    } catch (error) {
      sendJson(res, 400, { message: 'Invalid JSON body' });
      return;
    }
  }

  if (url.pathname === '/api/test-store/checkout' && method === 'POST') {
    sendJson(res, 200, { url: 'https://example.com/checkout' });
    return;
  }

  if (method === 'GET' && handleApiGet(url, res)) {
    return;
  }

  sendJson(res, 404, { message: 'Not found' });
});

server.listen(port, '127.0.0.1', () => {
  // eslint-disable-next-line no-console
  console.log(`[mock-api] listening on http://127.0.0.1:${port}`);
});

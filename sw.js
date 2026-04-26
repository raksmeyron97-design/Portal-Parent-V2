const CACHE_NAME = 'krusmart-parent-portal-v2'; // ដូរ Version ដើម្បីឱ្យវា Update ថ្មី

// បញ្ជីឯកសារដែលត្រូវរក្សាទុក (Cache) 
// ចំណាំ៖ ត្រូវប្រាកដថាឯកសារទាំងនេះមានពិតប្រាកដក្នុង Folder របស់អ្នក
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './pwa-install.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
    // លុប /style_index/ ចោលព្រោះកូដ CSS/JS របស់អ្នកស្ថិតក្នុង index.html ស្រាប់
];

// ១. Install Event: ទាញយកឯកសារទាំងអស់ខាងលើទៅរក្សាទុកក្នុង Cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('📦 កំពុងរក្សាទុកឯកសារចូល Cache (App Shell)...');
            return cache.addAll(ASSETS_TO_CACHE);
        }).catch(err => {
            console.error('❌ បរាជ័យក្នុងការ Cache ឯកសារ:', err);
        })
    );
    self.skipWaiting(); // បង្ខំឱ្យ Service Worker ថ្មីដំណើរការភ្លាមៗ
});

// ២. Activate Event: លុប Cache ចាស់ៗចោល នៅពេលយើង Update App ទៅ Version ថ្មី
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('🧹 កំពុងលុប Cache ចាស់:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// ៣. Fetch Event: ពេល App ត្រូវការទាញយកអ្វីមួយ វាប្រាប់ឱ្យឆែកក្នុង Cache សិន
self.addEventListener('fetch', (event) => {
    // មិនធ្វើការ Cache រាល់ Request ដែលពាក់ព័ន្ធនឹង Firebase API ឬ API ខាងក្រៅទេ
    if (event.request.url.includes('firestore.googleapis.com') ||
        event.request.url.includes('identitytoolkit.googleapis.com') ||
        event.request.url.includes('fonts.googleapis.com') ||
        event.request.url.includes('cdn.tailwindcss.com')) {
        return; // ទុកឱ្យ Browser ទាញយកតាមធម្មតា
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // បើមានក្នុង Cache យកមកប្រើភ្លាមៗ បើអត់ទើបទាញយកពី Internet
            return cachedResponse || fetch(event.request).catch(() => {
                console.log('🌐 មិនមានការតភ្ជាប់អ៊ីនធឺណិតទេ (Offline)');
            });
        })
    );
});
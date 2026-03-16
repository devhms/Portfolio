const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_PATH = process.cwd();
const TARBALL_NAME = 'project.tgz';
const tarballPath = path.join(require('os').tmpdir(), TARBALL_NAME);

console.log('Preparing deployment for:', PROJECT_PATH);

// 1. Detect framework
let framework = 'nextjs';
const pkg = JSON.parse(fs.readFileSync(path.join(PROJECT_PATH, 'package.json'), 'utf8'));
if (pkg.dependencies && pkg.dependencies.vite) framework = 'vite';

console.log('Detected framework:', framework);

// 2. Create tarball
try {
  console.log('Creating deployment package...', tarballPath);
  execSync(`tar -czf "${tarballPath}" -C "${PROJECT_PATH}" --exclude=node_modules --exclude=.git --exclude=.next --exclude=.DS_Store .`, { stdio: 'inherit' });
} catch (err) {
  console.error('Failed to create tarball:', err);
  process.exit(1);
}

// 3. Deploy to Vercel
const tarballContent = fs.readFileSync(tarballPath);

const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
const header = `--${boundary}\r\nContent-Disposition: form-data; name="framework"\r\n\r\n${framework}\r\n` +
               `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="project.tgz"\r\nContent-Type: application/gzip\r\n\r\n`;
const footer = `\r\n--${boundary}--\r\n`;

const postData = Buffer.concat([
  Buffer.from(header, 'utf8'),
  tarballContent,
  Buffer.from(footer, 'utf8')
]);

const options = {
  hostname: 'skill-deploy.vercel.app',
  port: 443,
  path: '/api/deploy',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': postData.length
  }
};

console.log('Deploying to Vercel...');

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const data = JSON.parse(body);
      console.log('\nDeployment Successful!');
      console.log('Preview URL:', data.url);
      console.log('Claim URL:  ', data.claimUrl);
      console.log('\nNote: It may take a minute for the build to start. Visit the Preview URL to check status.');
    } else {
      console.error('Deployment Failed:', res.statusCode, body);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(postData);
req.end();

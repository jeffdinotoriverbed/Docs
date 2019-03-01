webpackJsonp([0xadd336769f87],{397:function(e,t){e.exports={data:{markdownRemark:{html:'<p>API credentials allow secure access to the appbase.io APIs. They offer a variety of rules to granularly control access to the APIs.</p>\n<h2 id="defaults"><a href="#defaults" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Defaults</h2>\n<p>When creating an app in appbase.io, you have access to two types of API Credentials.</p>\n<p><img src="https://i.imgur.com/hkMdS7u.png"></p>\n<p>A <code class="gatsby-code-text">Read-only API key</code> offers access to read based endpoints of the <a href="https://rest.appbase.io">API</a> (you can get a document, search for documents, but not create or update a document) while an <code class="gatsby-code-text">Admin API key</code> offers access to both read an write based endpoints (you can create, update and even delete documents).</p>\n<h2 id="how-are-the-credentials-authenticated"><a href="#how-are-the-credentials-authenticated" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>How are the credentials authenticated?</h2>\n<p>An appbase.io credential consists of a <code class="gatsby-code-text">username:password</code> format and are authenticated using the <a href="https://en.wikipedia.org/wiki/Basic_access_authentication">HTTP Basic Authentication method</a>.</p>\n<p>When making the API request, the credentials are passed using the <code class="gatsby-code-text">Authorization</code> header with a base64 encoded value of the actual credentials. Here’s an example API credential translated to the Basic Authentication header format.</p>\n<p>API Credential: <code class="gatsby-code-text">9ZPVCJMls:bc1b93fc-0599-42fc-bc27-5034a72db138</code></p>\n<p>Its base64 equivalent is: <code class="gatsby-code-text">OVpQVkNKTWxzOmJjMWI5M2ZjLTA1OTktNDJmYy1iYzI3LTUwMzRhNzJkYjEzOA==</code> (<code class="gatsby-code-text">btoa(..)</code> is a built-in Javascript function which translates a string to its base64 equivalent value)</p>\n<p>This is the expected header to be passed when this credential is used directly as a part of the REST API: <code class="gatsby-code-text">Authorization: Basic OVpQVkNKTWxzOmJjMWI5M2ZjLTA1OTktNDJmYy1iYzI3LTUwMzRhNzJkYjEzOA==</code>.</p>\n<p>If you are using the <a href="https://docs.appbase.io/javascript/quickstart.html"><code class="gatsby-code-text">appbase-js</code></a> or <a href="https://opensource.appbase.io/reactive-manual/getting-started/reactivesearch.html"><code class="gatsby-code-text">ReactiveSearch</code></a> libraries, you don’t have to worry about the base64 conversion, these libraries do that for you. If you are using a server-side language, then you will have to add the <code class="gatsby-code-text">Authorization</code> header with the correct base64 encoded value of the API key as shown above. You can read more about it in the <a href="https://rest.appbase.io/#authentication">REST API Reference</a>.</p>\n<p>If you are using <a href="https://github.com/appbaseio/abc"><code class="gatsby-code-text">abc cli</code></a> for importing data into appbase.io, you can use the credential value as <a href="https://$%7Bcredential%7D@scalr.api.appbase.io/$%7Bappname%7D">https://${credential}@scalr.api.appbase.io/${appname}</a>. In the above example, the URL would look like <code class="gatsby-code-text">https://9ZPVCJMls:bc1b93fc-0599-42fc-bc27-5034a72db138@scalr.api.appbase.io/1234ad</code>. Also ensure that you are using a credential that has write permissions, as you won’t be able to insert data otherwise.</p>\n<h2 id="adding-and-updating-credentials"><a href="#adding-and-updating-credentials" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Adding and Updating Credentials</h2>\n<p>You can also create a new credentials or modify the existing defaults. When doing so, you can set one or more of the following restrictions.</p>\n<p><img src="https://i.imgur.com/UlF6rv8.png"></p>\n<p>Let’s go over each kind of authorization constraint you can apply to a key:</p>\n<ol>\n<li>\n<p><strong>Key Type</strong> determines the main type of operations this key will be responsible for. There are three key types:  </p>\n<p><img src="https://i.imgur.com/9IVZjIJ.png"></p>\n<ul>\n<li>Read-only key,  </li>\n<li>Write-only key,  </li>\n<li>Admin key (aka read + write).</li>\n</ul>\n</li>\n<li>\n<p><strong>ACLs</strong> determine granularly what type of actions are allowed for the API key in addition to the broad Key Type.  </p>\n<p><img src="https://i.imgur.com/FyLWp3e.png"></p>\n<ul>\n<li><strong>Index</strong> (index) allows indexing and update actions.</li>\n<li><strong>Get</strong> (get) allows retrieving documents and data mappings.</li>\n<li><strong>Search</strong> (search) allows searching for documents in an app.</li>\n<li><strong>Settings</strong> (settings) allow access to the settings endpoints.</li>\n<li><strong>Stream</strong> (stream) allows access to the streaming endpoints for realtime data updates.</li>\n<li><strong>Bulk</strong> (bulk) allows access to the bulk endpoints.</li>\n<li><strong>Delete</strong> (delete) allows access to all the deletion related endpoints.</li>\n<li><strong>Analytics</strong> (analytics) allows access to the Analytics APIs programmatically. [only available for <code class="gatsby-code-text">growth</code> plan users]</li>\n</ul>\n</li>\n</ol>\n<ol start="3">\n<li>\n<p><strong>Security</strong> constraints allow authorizing API access based on the selected HTTP Referers and IP Source values.</p>\n<ul>\n<li><strong>HTTP Referers</strong> allow adding one or more URIs that are whitelisted for accessing the API endpoints. By default, all referers are allowed access to the APIs.</li>\n</ul>\n<p><img src="https://i.imgur.com/lJjUAUT.png"></p>\n<blockquote>\n<p>Note <i class="fa fa-info-circle"></i></p>\n<p>HTTP Referers are passed by the browsers using the <code class="gatsby-code-text">Referer</code> header by the browsers. They are a good mechanism to prevent unauthorized access from browser environments but can be easily spoofed by a HTTP client running outside of a browser environment.</p>\n<p>We recommend using <strong>HTTP Referers</strong> as an additional safeguard to your security model, but not as the only safeguard.</p>\n</blockquote>\n<ul>\n<li><strong>IP Sources</strong> allow specifying whitelisted IP ranges (in CIDR format) that can access the APIs. By default, all IPs are allowed access to the APIs.</li>\n</ul>\n<p><img src="https://i.imgur.com/7iEZzsj.png"></p>\n<blockquote>\n<p>Note <i class="fa fa-info-circle"></i></p>\n<p>We don’t support specifying a blacklist of IP ranges. You can specify a maximum of <code class="gatsby-code-text">100</code> HTTP Referers and a maximum of <code class="gatsby-code-text">100</code> IP Sources.</p>\n</blockquote>\n</li>\n<li>\n<p><strong>Fields filtering</strong> allows setting restrictions on fields that are returned when performing a search action.</p>\n<ul>\n<li>\n<p><strong>Include</strong> fields offers a dropdown view to select one or more fields that should be included in the response.</p>\n</li>\n<li>\n<p><strong>Exclude</strong> fields offers a dropdown view to remove one or more fields that should be excluded from the response.</p>\n</li>\n</ul>\n</li>\n<li>\n<p><strong>Rate Limit by IP</strong> allows setting a per hour rate-limit for every unique IP that is used for making an API call with this API credential. By default, no rate limits are set. Setting a rate-limit prevents abuse of data for scraping or denial of service purposes.</p>\n</li>\n</ol>\n<p><img src="https://i.imgur.com/vt8NUmx.png"></p>\n<ol start="6">\n<li><strong>Time to Live (TTL)</strong> allows setting an optional expiration time till this API credential should be effective. You can create ephemeral keys that are only effective for minutes, hours, days or weeks to limit the surface area of keys being compromised. By default, an API credential lives forever.</li>\n</ol>\n<p><img src="https://i.imgur.com/QXpdEhH.png"></p>',frontmatter:{title:"API Credentials",next:"query-rules.html",prev:"analytics.html",nextTitle:"Query Rules",prevTitle:"Analytics"},fields:{path:"docs/concepts/api-credentials.md",slug:"concepts/api-credentials.html"}}},pathContext:{slug:"concepts/api-credentials.html"}}}});
//# sourceMappingURL=path---concepts-api-credentials-html-298cd4f5a9899d171693.js.map
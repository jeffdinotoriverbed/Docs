webpackJsonp([0xdf8918278a09],{412:function(n,s){n.exports={data:{markdownRemark:{html:'<p><a href="https://github.com/appbaseio/appbase-js">appbase-js</a> is a universal JavaScript client library for working with the appbase.io database.  </p>\n<p>It can:</p>\n<ul>\n<li>Index new documents or update / delete existing ones.</li>\n<li>Stream updates to documents, queries or filters over <code class="gatsby-code-text">websockets</code>.</li>\n<li>Work universally on Node.JS, Browser, and React Native.</li>\n</ul>\n<p>It can’t:  </p>\n<ul>\n<li>Configure mappings, change analyzers, or capture snapshots. All these are provided by <a href="https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html">elasticsearch.js</a> - the official ElasticSearch JS client library.</li>\n</ul>\n<p><a href="https://appbase.io">Appbase.io - the database service</a> is opinionated about cluster setup and hence doesn’t support the ElasticSearch devops APIs. See <a href="https://rest.appbase.io">rest.appbase.io</a> for a full reference on the supported APIs.</p>\n<p>This is a quick start guide to whet the appetite with the possibilities of data streams.</p>\n<h2 id="creating-an-app"><a href="#creating-an-app" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Creating an App</h2>\n<p><img src="https://i.imgur.com/r6hWKAG.gif"></p>\n<p>Log in to <span class="fa fa-external-link"></span> <a href="https://dashboard.appbase.io/">appbase.io dashboard</a>, and create a new app.</p>\n<p>For this tutorial, we will use an app called <code class="gatsby-code-text">newstreamingapp</code>. The credentials for this app are <code class="gatsby-code-text">meqRf8KJC:65cc161a-22ad-40c5-aaaf-5c082d5dcfda</code>.</p>\n<blockquote>\n<p>Note <i class="fa fa-info-circle"></i></p>\n<p>appbase.io uses <strong>HTTP Basic Auth</strong>, a widely used protocol for a username:password based authentication.</p>\n</blockquote>\n<h2 id="install-appbase-js"><a href="#install-appbase-js" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Install appbase-js</h2>\n<p>We will fetch and install the <strong>appbase-js</strong> lib using npm. <code class="gatsby-code-text">4.0.0-beta</code> is the most current version.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx">npm install appbase<span class="token operator">-</span>js\n</code></pre>\n      </div>\n<p>Adding it in the browser should be a one line script addition.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-html"><code class="gatsby-code-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">defer</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>https://unpkg.com/appbase-js/dist/appbase-js.umd.min.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script language-javascript"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>\n<p>Alternatively, a UMD build of the library can be used directly from <a href="https://cdn.jsdelivr.net/npm/appbase-js/dist/">jsDelivr</a>.</p>\n<p>To write data or stream updates from <a href="https://appbase.io">appbase.io</a>, we need to first create a reference object. We do this by passing the appbase.io API URL, app name, and credentials into the <code class="gatsby-code-text">Appbase</code> constructor:</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx"><span class="token keyword">var</span> appbaseRef <span class="token operator">=</span> <span class="token function">Appbase</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\turl<span class="token punctuation">:</span> <span class="token string">"https://scalr.api.appbase.io"</span><span class="token punctuation">,</span>\n\tapp<span class="token punctuation">:</span> <span class="token string">"newstreamingapp"</span><span class="token punctuation">,</span>\n\tcredentials<span class="token punctuation">:</span> <span class="token string">"meqRf8KJC:65cc161a-22ad-40c5-aaaf-5c082d5dcfda"</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p><strong>OR</strong></p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx"><span class="token keyword">var</span> appbaseRef <span class="token operator">=</span> <span class="token function">Appbase</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\turl<span class="token punctuation">:</span> <span class="token string">"https://meqRf8KJC:65cc161a-22ad-40c5-aaaf-5c082d5dcfda@scalr.api.appbase.io"</span><span class="token punctuation">,</span>\n\tapp<span class="token punctuation">:</span> <span class="token string">"newstreamingapp"</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>Credentials can also be directly passed as a part of the API URL.</p>\n<h2 id="storing-data"><a href="#storing-data" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Storing Data</h2>\n<p>Once we have the reference object (called <code class="gatsby-code-text">appbaseRef</code> in this tutorial), we can insert any JSON object into it with the <code class="gatsby-code-text">index()</code> method.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx"><span class="token keyword">var</span> jsonObject <span class="token operator">=</span> <span class="token punctuation">{</span>\n\t<span class="token string">"department_name"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n\t<span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n\t<span class="token string">"department_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n\t<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A Fake Book on Network Routing"</span><span class="token punctuation">,</span>\n\t<span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token number">5595</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx">appbaseRef<span class="token punctuation">.</span><span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\ttype<span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n\tid<span class="token punctuation">:</span> <span class="token string">"X1"</span><span class="token punctuation">,</span>\n\tbody<span class="token punctuation">:</span> jsonObject\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>where <code class="gatsby-code-text">type: &#39;books&#39;</code> indicate the collection (or table) inside which the data will be stored and the<code class="gatsby-code-text">id: &#39;1&#39;</code> is an optional unique identifier.</p>\n<p>The <code class="gatsby-code-text">index()</code> method (and all the other <code class="gatsby-code-text">appbase</code> methods except streaming methods) return a promise.</p>\n<blockquote>\n<p>Note <span class="fa fa-info-circle"></span></p>\n<p>appbase.io uses the same APIs and data modeling conventions as <a href="https://www.elastic.co/products/elasticsearch">ElasticSearch</a>. A <strong>type</strong> is equivalent to a collection in MongoDB or a table in SQL, and a <strong>document</strong> is similar to the document in MongoDB and equivalent to a row in SQL.</p>\n</blockquote>\n<h2 id="geting-or-streaming-data"><a href="#geting-or-streaming-data" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>GETing or Streaming Data</h2>\n<p>Unlike typical databases that support GET operations (or Read) for fetching data and queries, Appbase.io operates on both GET and stream modes.</p>\n<h3 id="getting-a-document-back"><a href="#getting-a-document-back" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Getting a Document Back</h3>\n<p>Now that we are able to store data, let’s try to get the data back from <a href="https://appbase.io">appbase.io</a> with the <code class="gatsby-code-text">get()</code> method.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx">appbaseRef<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\ttype<span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n\tid<span class="token punctuation">:</span> <span class="token string">"X1"</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token comment">/* get() response */</span>\n<span class="token punctuation">{</span>\n\t<span class="token string">"_index"</span><span class="token punctuation">:</span> <span class="token string">"newstreamingapp"</span><span class="token punctuation">,</span>\n\t<span class="token string">"_type"</span><span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n\t<span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token string">"X1"</span><span class="token punctuation">,</span>\n\t<span class="token string">"_version"</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n\t<span class="token string">"found"</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n\t<span class="token string">"_source"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\t<span class="token string">"department_name"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"department_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A Fake Book on Network Routing"</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token number">5595</span>\n\t<span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Even though <code class="gatsby-code-text">get()</code> returns a single document data, appbase.io returns it as a stream object with the ‘data’ event handler.</p>\n<h3 id="subscribing-to-a-document-stream"><a href="#subscribing-to-a-document-stream" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Subscribing to a Document Stream</h3>\n<p>Let’s say that we are interested in subscribing to all the state changes that happen on a document. Here, we would use the <code class="gatsby-code-text">getStream()</code> method over <code class="gatsby-code-text">get()</code>, which keeps returning new changes made to the document.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx">appbaseRef<span class="token punctuation">.</span><span class="token function">getStream</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\ttype<span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n\tid<span class="token punctuation">:</span> <span class="token string">"X1"</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"new document update: "</span><span class="token punctuation">,</span> response<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"getStream() failed with: "</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Don’t be surprised if you don’t see anything printed, <code class="gatsby-code-text">getStream()</code> only returns when new updates are made to the document.</p>\n<h3 id="observe-the-updates-in-realtime"><a href="#observe-the-updates-in-realtime" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Observe the updates in realtime</h3>\n<p>Let’s see live updates in action. We will modify the book price in our original <code class="gatsby-code-text">jsonObject</code> variable from 5595 to 6034 and apply <code class="gatsby-code-text">index()</code> again.</p>\n<p>For brevity, we will not show the <code class="gatsby-code-text">index()</code> operation here.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx"><span class="token comment">/* getStream() response */</span>\n<span class="token punctuation">{</span>\n\t<span class="token string">"_type"</span><span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n\t<span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token string">"X1"</span><span class="token punctuation">,</span>\n\t<span class="token string">"_source"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\t<span class="token string">"department_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"department_name"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A Fake Book on Network Routing"</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token number">6034</span>\n\t<span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>In the new document update, we can see the price change (5595 -> 6034) being reflected. Subsequent changes will be streamed as JSON objects.</p>\n<p><code class="gatsby-code-text">Note:</code> Appbase always streams the final state of an object, and not the diff b/w the old state and the new state. You can compute diffs on the client side by persisting the state using a composition of (_type, _id) fields.</p>\n<h2 id="streaming-rich-queries"><a href="#streaming-rich-queries" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Streaming Rich Queries</h2>\n<p>Streaming document updates are great for building messaging systems or notification feeds on individual objects. What if we were interested in continuously listening to a broader set of data changes? The <code class="gatsby-code-text">searchStream()</code> method scratches this itch perfectly.</p>\n<p>In the example below, we will see it in action with a <code class="gatsby-code-text">match_all</code> query that returns any time a new document is added to the type ‘books’ or when any of the existing documents are modified.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx">appbaseRef<span class="token punctuation">.</span><span class="token function">searchStream</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\ttype<span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n\tbody<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\tquery<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\t\tmatch_all<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\t\t<span class="token punctuation">}</span>\n\t<span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"searchStream(), new match: "</span><span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"caught a searchStream() error: "</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token comment">/* Response when a new data matches */</span>\n<span class="token punctuation">{</span>\n\t<span class="token string">"_type"</span><span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n\t<span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token string">"X1"</span><span class="token punctuation">,</span>\n\t<span class="token string">"_version"</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n\t<span class="token string">"found"</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n\t<span class="token string">"_source"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\t<span class="token string">"department_name"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"department_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A Fake Book on Network Routing"</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token number">6034</span>\n\t<span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p><code class="gatsby-code-text">Note:</code> Like <code class="gatsby-code-text">getStream()</code>, <code class="gatsby-code-text">searchStream()</code> subscribes to the new matches. For fetching existing search results, check out <a href="/javascript/api-reference.html#search"><code class="gatsby-code-text">search()</code></a>.</p>\n<p><strong>v0.10.0</strong> introduces a new method <a href="/javascript/api-reference.html#searchstreamtourl"><code class="gatsby-code-text">searchStreamToURL()</code></a> that streams results directly to a URL instead of streaming back.</p>\n<p>In this tutorial, we have learnt how to index new data and stream both individual data and results of an expressive query.</p>',frontmatter:{title:"JavaScript Quickstart",next:"api-reference.html",prev:null,nextTitle:"JavaScript API Reference",prevTitle:null},fields:{path:"docs/javascript/quickstart.md",slug:"javascript/quickstart.html"}}},pathContext:{slug:"javascript/quickstart.html"}}}});
//# sourceMappingURL=path---javascript-quickstart-html-89722b880c1b4799e10c.js.map
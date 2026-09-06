import Link from 'next/link';
import { Monitor, ArrowLeft } from 'lucide-react';
import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window==='undefined')return;try{var c=console.error;Object.defineProperty(console,'error',{configurable:true,enumerable:true,get:function(){return function(){var a=Array.prototype.slice.call(arguments);var s='';for(var i=0;i<a.length;i++){try{s+=' '+(typeof a[i]==='object'&&a[i]!==null?JSON.stringify(a[i]):String(a[i]))}catch(e){s+=' '+String(a[i])}}if(s.indexOf('bis_skin_checked')!==-1||s.indexOf('bis_register')!==-1||s.indexOf('__processed_')!==-1){return}return c.apply(console,a)}},set:function(f){c=f}})}catch(e){}try{var o=new MutationObserver(function(m){for(var i=0;i<m.length;i++){if(m[i].type==='attributes'&&(m[i].attributeName==='bis_skin_checked'||m[i].attributeName==='bis_register')){m[i].target.removeAttribute(m[i].attributeName)}}});if(document.documentElement){o.observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:['bis_skin_checked','bis_register']})}}catch(e){}})();`
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased" suppressHydrationWarning>
        <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center" suppressHydrationWarning>
          <div className="mb-8 p-6 bg-muted/30 rounded-full" suppressHydrationWarning>
            <Monitor className="w-12 h-12 text-muted-foreground" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Page not found
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md mb-12">
            The test or page you are looking for does not exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/en/tests"
              className="flex items-center justify-center gap-2 bg-foreground text-background px-8 py-3 rounded-full font-medium hover:bg-foreground/90 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              View all tests
            </Link>
            
            <Link 
              href="/en"
              className="flex items-center justify-center gap-2 border border-border/50 bg-background text-foreground px-8 py-3 rounded-full font-medium hover:bg-muted/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

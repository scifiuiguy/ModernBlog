/**
 * Remark plugin to fix image paths in Markdown
 * Ensures image src attributes use the correct base path
 * Handles both /ModernBlog/Images/ and /Images/ paths
 */
export function remarkFixImagePaths() {
  return (tree) => {
    const basePath = process.env.ASTRO_BASE_PATH || '/ModernBlog/';
    // Ensure basePath ends with /
    const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    
    function visit(node) {
      if (node.type === 'html' && node.value) {
        // Fix img src attributes - be very precise with the regex
        // Match: src="/Images/filename.jpg" or src="/ModernBlog/Images/filename.jpg"
        // Replace with: src="/ModernBlog/Images/filename.jpg"
        node.value = node.value.replace(
          /src=(["'])(\/ModernBlog\/Images\/|\/Images\/)([^"']+)\1/g,
          (match, quote, pathPrefix, imagePath) => {
            // Always use the base path from env, ensuring no double-prefixing
            return `src=${quote}${normalizedBase}Images/${imagePath}${quote}`;
          }
        );
      }
      
      if (node.children) {
        node.children.forEach(visit);
      }
    }
    
    visit(tree);
  };
}


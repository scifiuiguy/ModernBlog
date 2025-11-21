/**
 * Remark plugin to automatically convert YouTube URLs to embeds
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */

export function remarkYouTubeEmbed() {
  return (tree) => {
    // YouTube URL patterns
    const youtubePatterns = [
      /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
      /https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/,
      /https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    ];

    const extractVideoId = (url) => {
      for (const pattern of youtubePatterns) {
        const match = url.match(pattern);
        if (match) {
          return match[1];
        }
      }
      return null;
    };

    const visit = (node, index, parent) => {
      if (node.type === 'paragraph' && node.children) {
        // Check if paragraph contains only a single link node (markdown auto-converts URLs to links)
        const linkNodes = node.children.filter(child => child.type === 'link');
        const textNodes = node.children.filter(child => child.type === 'text');
        
        // Case 1: Paragraph contains only a single link with YouTube URL
        if (linkNodes.length === 1 && textNodes.length === 0) {
          const link = linkNodes[0];
          const videoId = extractVideoId(link.url);
          if (videoId) {
            // Replace the paragraph with an HTML embed
            parent.children[index] = {
              type: 'html',
              value: `<div class="youtube-embed" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    src="https://www.youtube.com/embed/${videoId}" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>`,
            };
            return;
          }
        }
        
        // Case 2: Paragraph contains only text nodes (URL not yet converted to link)
        // This handles cases where the URL might be plain text
        if (linkNodes.length === 0 && textNodes.length > 0) {
          const allText = textNodes.map(n => n.value).join('').trim();
          const videoId = extractVideoId(allText);
          // Only replace if the entire text is the YouTube URL
          if (videoId && allText.match(/^https?:\/\/(?:www\.)?(youtube\.com|youtu\.be)/)) {
            parent.children[index] = {
              type: 'html',
              value: `<div class="youtube-embed" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    src="https://www.youtube.com/embed/${videoId}" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>`,
            };
            return;
          }
        }
      }

      // Recursively visit children
      if (node.children) {
        node.children.forEach((child, i) => visit(child, i, node));
      }
    };

    if (tree.children) {
      tree.children.forEach((child, i) => visit(child, i, tree));
    }
  };
}


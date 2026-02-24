import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { formatDate } from '../lib/utils';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';
import { blogPosts } from '../data/staticData';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <h1 className="font-heading text-2xl mb-4">Post not found</h1>
        <Link to="/blog">
          <Button className="rounded-full">Back to Blog</Button>
        </Link>
      </div>
    );
  }

  const formattedDate = formatDate(post.created_at);

  return (
    <div className="min-h-screen pt-24" data-testid="blog-detail-page">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.cover_image}
        path={`/blog/${post.slug}`}
      />
      <div className="relative h-[40vh] md:h-[50vh]">
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <article className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="-mt-32 relative z-10 bg-white rounded-t-2xl p-8 md:p-12"
        >
          <Link 
            to="/blog" 
            className="font-body text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mb-6"
            data-testid="back-to-blog"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                className="bg-primary/10 text-primary hover:bg-primary/10"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="blog-title">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="font-body">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="font-body">{formattedDate}</span>
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none font-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
            data-testid="blog-content"
          />

          <div className="mt-12 pt-8 border-t border-border">
            <p className="font-body text-sm text-muted-foreground mb-4">Share this article</p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="rounded-full">
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Facebook
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                LinkedIn
              </Button>
            </div>
          </div>
        </motion.div>
      </article>

      <section className="py-16 bg-muted mt-12">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Bring These Ideas to Life?
          </h2>
          <p className="font-body text-muted-foreground mb-6">
            Let us help you create your perfect event.
          </p>
          <Link to="/contact">
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
              data-testid="blog-detail-contact-btn"
            >
              Get a Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;

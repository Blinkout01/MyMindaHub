import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Smile, Heart, Shield, ArrowRight } from 'lucide-react';

const topicsContent = {
  emotions: {
    title: 'Understanding Emotions',
    icon: Smile,
    color: 'text-blue-600',
    sections: [
      {
        title: 'What are Emotions?',
        content: 'Emotions are like special messages from our heart and mind! They help us understand how we feel about things happening around us. Just like different colors in a rainbow, we have many different emotions!',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'The Emotion Family',
        content: 'Meet some common emotions:\n\n* Happy: When you feel sunny and bright inside\n* Sad: When your heart feels heavy\n* Angry: When something bothers you a lot\n* Scared: When you feel unsure or worried\n* Excited: When you can\'t wait for something good'
      },
      {
        title: 'Expressing Your Feelings',
        content: 'It\'s okay to feel any emotion! The important thing is knowing how to express them in a good way:\n\n1. Use your words to tell others how you feel\n2. Draw pictures of your emotions\n3. Take deep breaths when you feel strong emotions\n4. Talk to a grown-up you trust'
      }
    ]
  },
  stress: {
    title: 'Stress Management',
    icon: Heart,
    color: 'text-pink-600',
    sections: [
      {
        title: 'What is Stress?',
        content: 'Stress is when we feel overwhelmed or worried about things. It\'s like carrying a heavy backpack - it can make us feel tired and uncomfortable. But don\'t worry, there are many ways to make it lighter!',
        image: 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Stress Busters',
        content: 'Here are some fun ways to feel better:\n\n1. Take slow, deep breaths like smelling a flower\n2. Stretch like a cat waking up from a nap\n3. Listen to your favorite happy music\n4. Draw or color something peaceful\n5. Talk to someone you trust about your worries'
      },
      {
        title: 'Creating Your Calm Space',
        content: 'Everyone needs a special place where they can feel calm and safe. This could be:\n\n* A cozy corner in your room\n* Under a favorite tree\n* In the school library\n* Next to a trusted grown-up'
      }
    ]
  },
  bullying: {
    title: 'Bullying Prevention',
    icon: Shield,
    color: 'text-purple-600',
    sections: [
      {
        title: 'What is Bullying?',
        content: 'Bullying is when someone repeatedly does or says mean things to hurt others. It\'s never okay, and it\'s not your fault if someone bullies you. Everyone deserves to feel safe and happy!',
        image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Being Brave',
        content: 'If you see bullying or experience it, remember these steps:\n\n1. Tell a trusted adult (teacher, parent, counselor)\n2. Stay with friends - bullies often avoid groups\n3. Use your voice - say "Stop!" or "That\'s not okay!"\n4. Walk away from unsafe situations\n5. Be kind to yourself and others'
      },
      {
        title: 'Being a Good Friend',
        content: 'You can help stop bullying by:\n\n* Including others in games and activities\n* Standing up for friends who are being bullied\n* Being kind to everyone, even if they\'re different\n* Telling a grown-up if you see someone being bullied'
      }
    ]
  }
};

const TopicDetail = () => {
  const { id } = useParams();
  const topic = topicsContent[id as keyof typeof topicsContent];

  if (!topic) {
    return <div>Topic not found</div>;
  }

  const Icon = topic.icon;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center mb-8">
        <Icon className={`h-12 w-12 ${topic.color} mr-3`} />
        <h1 className="text-3xl font-bold text-purple-800">{topic.title}</h1>
      </div>

      <div className="space-y-8">
        {topic.sections.map((section, index) => (
          <div key={index} className="card">
            {section.image && (
              <div className="relative h-48 -mx-6 -mt-6 mb-6 rounded-t-xl overflow-hidden">
                <img 
                  src={section.image} 
                  alt={section.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">{section.title}</h2>
            <div className="prose max-w-none">
              {section.content.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4 text-gray-700 whitespace-pre-line">{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link 
          to={`/quiz/${id}`} 
          className="btn-primary flex items-center space-x-2"
        >
          <span>Take the Quiz</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default TopicDetail;
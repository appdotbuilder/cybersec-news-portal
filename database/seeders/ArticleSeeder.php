<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a demo admin user for articles
        $admin = User::firstOrCreate(
            ['email' => 'admin@cybertech.news'],
            [
                'name' => 'CyberTech Admin',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create some published articles
        $publishedArticles = [
            [
                'title' => 'Zero Trust Security: The Future of Cybersecurity Architecture',
                'excerpt' => 'Explore how Zero Trust architecture is revolutionizing cybersecurity by eliminating the concept of trusted networks and implementing strict identity verification for every transaction.',
                'content' => "Zero Trust security represents a fundamental shift in how organizations approach cybersecurity. Unlike traditional security models that assume everything inside the corporate network is trustworthy, Zero Trust operates on the principle of 'never trust, always verify.'\n\nThis approach requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter.\n\nKey principles of Zero Trust include:\n\n1. **Verify explicitly**: Always authenticate and authorize based on all available data points\n2. **Use least privilege access**: Limit user access with just-in-time and just-enough-access (JIT/JEA)\n3. **Assume breach**: Minimize blast radius and segment access\n\nImplementing Zero Trust requires a comprehensive strategy that encompasses identity and access management, device security, network security, and data protection. Organizations must also consider the user experience and ensure that security measures don't impede productivity.\n\nThe benefits of Zero Trust architecture include improved security posture, better compliance, reduced risk of data breaches, and enhanced visibility into network activity. However, implementation challenges include complexity, cost, and the need for organizational change management.",
                'featured_image' => 'https://picsum.photos/800/600?random=1',
                'status' => 'published',
                'published_at' => now()->subDays(7),
            ],
            [
                'title' => 'AI-Powered Threat Detection: Machine Learning in Cybersecurity',
                'excerpt' => 'Discover how artificial intelligence and machine learning are transforming threat detection capabilities, enabling organizations to identify and respond to cyber threats faster than ever before.',
                'content' => "Artificial Intelligence (AI) and Machine Learning (ML) are revolutionizing cybersecurity by providing unprecedented capabilities for threat detection and response. These technologies can analyze vast amounts of data in real-time, identify patterns that humans might miss, and respond to threats with lightning speed.\n\nTraditional security tools rely on signature-based detection, which can only identify known threats. AI-powered security solutions, however, can detect anomalies and identify previously unknown threats by analyzing behavior patterns and comparing them to established baselines.\n\nKey applications of AI in cybersecurity include:\n\n**Behavioral Analysis**: AI systems can establish baselines of normal user and network behavior, then flag deviations that might indicate a security incident.\n\n**Malware Detection**: Machine learning algorithms can identify malicious code by analyzing its characteristics and behavior, even if it's a never-before-seen variant.\n\n**Fraud Prevention**: AI can analyze transaction patterns and user behavior to identify potentially fraudulent activities in real-time.\n\n**Automated Response**: AI systems can automatically respond to certain types of threats, such as isolating infected devices or blocking suspicious network traffic.\n\n**Threat Intelligence**: Machine learning can process and analyze threat intelligence feeds to identify emerging threats and attack patterns.\n\nWhile AI-powered cybersecurity offers significant advantages, organizations must also be aware of potential challenges, including false positives, the need for quality training data, and the risk of adversarial attacks against AI systems themselves.",
                'featured_image' => 'https://picsum.photos/800/600?random=2',
                'status' => 'published',
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Cloud Security Best Practices for Remote Work Environments',
                'excerpt' => 'Learn essential strategies for securing cloud infrastructure and data in the era of remote work, including identity management, data encryption, and network security considerations.',
                'content' => "The shift to remote work has accelerated cloud adoption across organizations of all sizes. While cloud computing offers numerous benefits including scalability, cost-effectiveness, and accessibility, it also introduces new security challenges that organizations must address.\n\nCloud security is a shared responsibility between cloud service providers and customers. Understanding this shared responsibility model is crucial for implementing effective security measures.\n\n**Identity and Access Management (IAM)**\nImplementing robust IAM practices is fundamental to cloud security. This includes:\n- Multi-factor authentication (MFA) for all user accounts\n- Role-based access control (RBAC) to limit permissions\n- Regular access reviews and deprovisioning of unused accounts\n- Privileged access management for administrative functions\n\n**Data Protection**\nProtecting sensitive data in the cloud requires:\n- Encryption of data at rest and in transit\n- Proper key management practices\n- Data loss prevention (DLP) solutions\n- Regular data backups and disaster recovery planning\n\n**Network Security**\nSecuring cloud networks involves:\n- Virtual private clouds (VPCs) for network isolation\n- Network segmentation and micro-segmentation\n- Web application firewalls (WAF) for application protection\n- DDoS protection services\n\n**Monitoring and Compliance**\nContinuous monitoring and compliance are essential:\n- Real-time security monitoring and alerting\n- Log management and analysis\n- Compliance with regulatory requirements\n- Regular security assessments and penetration testing\n\nOrganizations should also implement cloud security posture management (CSPM) tools to continuously assess and improve their cloud security configuration.",
                'featured_image' => 'https://picsum.photos/800/600?random=3',
                'status' => 'published',
                'published_at' => now()->subDays(3),
            ],
            [
                'title' => 'Ransomware Protection: Building Multi-Layered Defense Strategies',
                'excerpt' => 'Comprehensive guide to protecting your organization against ransomware attacks through prevention, detection, and response strategies that minimize risk and impact.',
                'content' => "Ransomware attacks have become one of the most significant cybersecurity threats facing organizations today. These attacks can paralyze business operations, result in significant financial losses, and damage an organization's reputation. Building an effective defense against ransomware requires a multi-layered approach.\n\n**Prevention Strategies**\n\n1. **Employee Training and Awareness**: Since many ransomware attacks begin with phishing emails, educating employees about recognizing suspicious emails and attachments is crucial.\n\n2. **Patch Management**: Keeping operating systems, applications, and security software up to date helps prevent attackers from exploiting known vulnerabilities.\n\n3. **Network Segmentation**: Isolating critical systems and limiting lateral movement can prevent ransomware from spreading across the entire network.\n\n4. **Access Controls**: Implementing the principle of least privilege ensures that users have only the minimum access necessary to perform their job functions.\n\n**Detection and Response**\n\n1. **Endpoint Detection and Response (EDR)**: Advanced EDR solutions can detect ransomware behavior and stop attacks before they encrypt critical files.\n\n2. **Network Monitoring**: Continuous monitoring of network traffic can help identify suspicious activities that may indicate a ransomware attack in progress.\n\n3. **Incident Response Planning**: Having a well-defined incident response plan ensures that the organization can respond quickly and effectively to minimize damage.\n\n**Recovery and Business Continuity**\n\n1. **Regular Backups**: Maintaining secure, regularly tested backups is one of the most effective ways to recover from a ransomware attack without paying the ransom.\n\n2. **Disaster Recovery Planning**: A comprehensive disaster recovery plan ensures that critical systems can be restored quickly to minimize business disruption.\n\n3. **Cyber Insurance**: While not a substitute for good security practices, cyber insurance can help cover the costs associated with ransomware attacks.\n\nOrganizations should regularly test their ransomware defenses through simulated attacks and tabletop exercises to identify weaknesses and improve their response capabilities.",
                'featured_image' => 'https://picsum.photos/800/600?random=4',
                'status' => 'published',
                'published_at' => now()->subDays(1),
            ]
        ];

        foreach ($publishedArticles as $articleData) {
            Article::create(array_merge($articleData, [
                'author_id' => $admin->id,
                'slug' => \Illuminate\Support\Str::slug($articleData['title']),
            ]));
        }

        // Create some additional random articles
        Article::factory()
            ->count(15)
            ->published()
            ->create(['author_id' => $admin->id]);

        // Create some draft articles
        Article::factory()
            ->count(5)
            ->draft()
            ->create(['author_id' => $admin->id]);
    }
}
// Static content updater for Kingdom Spices Herbs - FAQ Page
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqContent = [
        {
            question: 'Do you provide blend development?',
            answer: 'Yes—custom recipes with NDAs.'
        },
        {
            question: 'Can you match competitor specs?',
            answer: 'Share samples/CoA; we\'ll benchmark and propose.'
        },
        {
            question: 'Do you support e-commerce formats?',
            answer: 'Yes—stand-up pouches, shippers, and labels.'
        },
        {
            question: 'What about heavy metals and aflatoxins?',
            answer: 'Tested as per destination limits.'
        },
        {
            question: 'Do you offer eco packaging?',
            answer: 'Yes—recyclable/biodegradable options.'
        },
        {
            question: 'Are essential oils available?',
            answer: 'Selected herb oils on request.'
        },
        {
            question: 'Can you supply pharma-grade lots?',
            answer: 'Food or pharma specs as required.'
        },
        {
            question: 'How are returns/claims handled?',
            answer: 'Documented CAPA with root-cause analysis.'
        },
        {
            question: 'Do you run retention samples?',
            answer: 'Yes—kept per lot for traceability.'
        },
        {
            question: 'Can you support rapid launches?',
            answer: 'Yes—expedited sampling and packing windows.'
        }
    ];
    
    faqItems.forEach((item, index) => {
        if (index < faqContent.length) {
            const question = item.querySelector('.faq-header button');
            const answer = item.querySelector('.faq-body p');
            
            if (question) question.textContent = faqContent[index].question;
            if (answer) answer.textContent = faqContent[index].answer;
        }
    });
});
const onSubmit = (e) => {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';
    
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '') {
        alert('Please enter a text');
        return;
    }

    generateImage(prompt, size);
};

const generateImage = async (prompt, size) => {
    try {
        showSpinner();
        const response = await fetch('/openai/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });

        if (!response.ok) {
            removeSpinner();
            throw new Error('The image could not be created');
        }

        const { data: imageUrl } = await response.json();
        
        document.querySelector('#image').src = imageUrl;
        removeSpinner();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

const showSpinner = () => document.querySelector('#spinner').classList.add('spinner');

const removeSpinner = () => document.querySelector('#spinner').classList.remove('spinner');

document.querySelector('#image-form').addEventListener('submit', onSubmit);
tinymce.init({
    selector: '#editor',
    height: 400,
    branding: false,

    plugins: "emoticons link lists image media preview imagetools code codesample",

    codesample_languages: [
        {text: 'HTML/XML', value: 'markup'},
        {text: 'JavaScript', value: 'javascript'},
        {text: 'CSS', value: 'css'},
        {text: 'PHP', value: 'php'},
        {text: 'Ruby', value: 'ruby'},
        {text: 'Python', value: 'python'},
        {text: 'Java', value: 'java'},
        {text: 'C', value: 'c'},
        {text: 'C#', value: 'csharp'},
        {text: 'C++', value: 'cpp'}
    ],

    images_upload_url: '/admin/image-upload',
    automatic_uploads: true,

    image_dimensions: false,
    media_live_embeds: true
});
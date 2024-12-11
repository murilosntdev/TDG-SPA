const translateInputName = (oldText, oldName, newName) => {
    var newText = oldText.replace(oldName, newName);

    return newText;
};

export default translateInputName;
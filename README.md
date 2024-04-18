# ChordUI

ChordUI is a simple interface for displaying chord diagrams based on JSON data input. It allows users to upload JSON files containing chord information and navigate through different chord positions.

## Usage

To use ChordUI, follow these steps:

1. **Input File Format**: Prepare a JSON file with the following format:
    ```json
    {
        "key": "C",
        "suffix": "major",
        "positions": [
            {
                "frets": "x32010",
                "fingers": [
                    "032010",
                    "043020"
                ]
            },
            // Add more chord positions as needed
        ]
    }
    ```
    - `"key"`: The root note of the chord (e.g., "C", "G", "D").
    - `"suffix"`: The chord quality (e.g., "major", "minor", "7").
    - `"positions"`: An array of chord positions, each containing:
        - `"frets"`: The fret positions on the guitar strings represented as a string (e.g., "x32010").
        - `"fingers"`: Optional. The finger positions for each string, represented as a string (e.g., "032010").

2. **Upload File**: Open the ChordUI interface and upload your JSON file using the file input or by dragging and dropping the file onto the designated area.

3. **Navigate Chords**: Once the file is loaded, use the navigation buttons (previous and next) to cycle through different chord positions if available.

4. **Interact with Fingers**: If multiple finger positions are available for a chord, click on the bullet navigator to switch between fingerings.

## Features

- **Dynamic Size Adjustment**: The interface adjusts its size based on the loaded content, providing a better viewing experience.
- **Support for Larger Frets**: ChordUI supports frets larger than 9, allowing for chords with fret positions such as A(10), B(11), C(12), and so on.
- **Drag-and-Drop Upload**: Allows for easy file upload by dragging and dropping files onto the designated area.
- **Interactive Navigator**: Provides a bullet navigator for navigating through different finger positions of a chord.

## Notes

- Ensure your JSON file follows the specified format for proper functionality.
- Supported file type: JSON.

## Example

An example JSON file:

```json
{
    "key": "C",
    "suffix": "major",
    "positions": [
        {
            "frets": "x32010",
            "fingers": [
                "032010",
                "043020"
            ]
        },
        // Add more chord positions as needed
    ]
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize and integrate ChordUI into your projects! If you encounter any issues or have suggestions for improvement, please let us know.
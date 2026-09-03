from pathlib import Path
from PIL import Image, ImageDraw


ROOT = Path(__file__).parent


def crop(source_name, box, output_name):
    image = Image.open(ROOT / source_name).convert("RGB")
    x, y, width, height = box
    image.crop((x, y, x + width, y + height)).save(ROOT / output_name, quality=94)


def comparison(source_name, implementation_name, output_name):
    source = Image.open(ROOT / source_name).convert("RGB")
    implementation = Image.open(ROOT / implementation_name).convert("RGB")
    target_height = max(source.height, implementation.height)

    def fit(image):
        width = round(image.width * target_height / image.height)
        return image.resize((width, target_height), Image.Resampling.LANCZOS)

    source = fit(source)
    implementation = fit(implementation)
    label_height = 34
    gutter = 24
    canvas = Image.new(
        "RGB",
        (source.width + implementation.width + gutter, target_height + label_height),
        "#f3f4f6",
    )
    draw = ImageDraw.Draw(canvas)
    draw.text((12, 10), "FIGMA SOURCE", fill="#263234")
    draw.text((source.width + gutter + 12, 10), "IMPLEMENTATION", fill="#263234")
    canvas.paste(source, (0, label_height))
    canvas.paste(implementation, (source.width + gutter, label_height))
    canvas.save(ROOT / output_name, quality=92)


crop("full-funds.jpg", (139, 300, 408, 36), "implementation-banner.jpg")
crop("full-rpq.jpg", (139, 122, 408, 133), "implementation-rpq-question.jpg")
crop("full-signature.jpg", (380, 35, 398, 788), "implementation-signature.jpg")

comparison("source-banner.png", "implementation-banner.jpg", "comparison-banner.jpg")
comparison("source-rpq-question.png", "implementation-rpq-question.jpg", "comparison-rpq-question.jpg")
comparison("source-signature-empty.png", "implementation-signature.jpg", "comparison-signature.jpg")

# Latest annotation pass: focused component comparisons at the default desktop viewport.
crop("implementation-policy-cards.jpg", (318, 245, 856, 415), "implementation-policy-list.jpg")
crop("implementation-policy-cards.jpg", (1105, 266, 58, 28), "implementation-neutral-tag.jpg")
crop("implementation-text-field-closed.jpg", (314, 448, 383, 64), "implementation-text-field.jpg")
crop("implementation-dropdown-menu.jpg", (314, 381, 383, 128), "implementation-dropdown-list.jpg")

comparison("source-policy-cards.png", "implementation-policy-list.jpg", "comparison-policy-cards.jpg")
comparison("source-neutral-tag.png", "implementation-neutral-tag.jpg", "comparison-neutral-tag.jpg")
comparison("source-text-field.png", "implementation-text-field.jpg", "comparison-text-field.jpg")
comparison("source-dropdown-menu.png", "implementation-dropdown-list.jpg", "comparison-dropdown-menu.jpg")

crop("implementation-signature-filled.jpg", (381, 33, 398, 793), "implementation-signature-filled-crop.jpg")
comparison("source-signature.png", "implementation-signature-filled-crop.jpg", "comparison-signature-filled.jpg")

# Current annotation pass: exact Self-Serve status chip and checkbox components.
comparison("source-status-chip.png", "implementation-status-chip.png", "comparison-status-chip.jpg")
comparison("source-checkbox.png", "implementation-checkbox-row.jpg", "comparison-checkbox.jpg")
